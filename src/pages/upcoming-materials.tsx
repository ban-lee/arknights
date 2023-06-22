import { Box, Text } from '@mantine/core';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { Material as MaterialComponent } from '@/components/materials';
import { Material } from '@prisma/client';
import { MaterialEvent } from '@/types/keystone-types';
import { MaterialTimeline } from '@/components/material-timeline';
import { PageTitle } from '@/components/page-title';
import { prisma } from '@/utils/prisma';

interface TimelineInfo {
  material: Material;
  // Only contains entries for events that drop the material
  events: MaterialEvent[];
}

function generateTimelines(events: MaterialEvent[], materials: Material[]) {
  const newTimelines: TimelineInfo[] = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    for (const eventDrop of event.materials) {
      const existingTimeline = newTimelines.find((tl) => tl.material.id === eventDrop.id);

      if (existingTimeline) {
        existingTimeline.events[i] = event;
      } else {
        const tlMat = materials.find((mat) => mat.id === eventDrop.id)!;
        const tlEvents: MaterialEvent[] = new Array(events.length);
        tlEvents[i] = event;

        newTimelines.push({ material: tlMat, events: tlEvents });
      }
    }
  }

  for (const material of materials) {
    const inTimeline = newTimelines.some((tl) => tl.material.id === material.id);
    if (inTimeline) continue;

    newTimelines.push({ material, events: new Array(events.length) });
  }

  return newTimelines;
}

export default function Mats({ events, materials }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const timelines: TimelineInfo[] = generateTimelines(events, materials);

  return (
    <Layout title={'Karlan Tools: Upcoming Farming Materials'}>
      <>
        <PageTitle title="Upcoming Events Drops" />
        <Text
          sx={{
            maxWidth: 800,
            margin: '0 auto 1.5em',
            textAlign: 'center',
          }}
        >
          Tentative start dates powered by hopes and dreams.
          <br />
          Until announced officially by Yostar, it is all guess work.
        </Text>
        <Box
          sx={{
            padding: '0 1em 2em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {timelines.map((tl) => {
            return (
              <Box
                key={tl.material.id}
                sx={{
                  maxWidth: 780,

                  display: 'flex',
                  gap: '1em',
                }}
              >
                <MaterialComponent material={tl.material} />
                <MaterialTimeline events={tl.events} />
              </Box>
            );
          })}
        </Box>
      </>
    </Layout>
  );
}

async function getEvents() {
  return await prisma.event.findMany({
    orderBy: [{ estimatedStart: 'asc' }],
    select: {
      id: true,
      name: true,
      estimatedStart: true,
      enStart: true,
      enEnd: true,
      headerImg: true,
      topColour: true,
      materials: true,
    },
    where: {
      AND: [
        {
          materials: { some: {} },
        },
        {
          OR: [
            // Events that only have tentative dates.
            {
              enStart: { equals: null },
            },
            // Events that haven't ended in global.
            {
              enEnd: { gte: new Date().toISOString() },
            },
          ],
        },
      ],
    },
  });
}

async function getMaterials() {
  return await prisma.material.findMany({
    where: {
      rarity: { equals: 't3' },
      imgId: { startsWith: 'MTL_SL' },
    },
  });
}

export async function getServerSideProps() {
  const events = await getEvents();
  const materials = await getMaterials();

  return {
    props: {
      events,
      materials,
    },
  };
}
