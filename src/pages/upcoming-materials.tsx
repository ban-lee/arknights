import { Box, Text } from '@mantine/core';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { Material } from '@/components/materials/material';
import { MaterialTimeline } from '@/components/material-timeline';
import { PageTitle } from '@/components/page-title';
import { prisma } from '@/utils/prisma';

export default function Mats({ events, materials }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const lastKnownEvent = events[events.length - 1];
  const maxMonth = (lastKnownEvent.enStart ?? lastKnownEvent.estimatedStart)!.getMonth();

  return (
    <Layout title={'Karlan Tools: Upcoming Farming Materials'}>
      <>
        <PageTitle title="Upcoming Farming Events" />
        <Text
          sx={{
            maxWidth: 800,
            margin: '0 auto 2em',
            textAlign: 'center',
          }}
        >
          Tentative start dates powered by hopes and dreams.
          <br />
          Until announced officially by Yostar, it is all guess work.
        </Text>
        <Box
          sx={{
            margin: '0 auto 2em',
            maxWidth: 780,
            padding: '0 1em',

            display: 'flex',
            gap: '1em',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5em',
            }}
          >
            {materials.map((mat) => {
              return (
                <Material
                  key={mat.id}
                  material={mat}
                />
              );
            })}
          </Box>
          <Box
            sx={{
              flex: '1 1',

              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {materials.map((mat) => {
              return (
                <MaterialTimeline
                  key={mat.id}
                  matId={mat.id}
                  events={events}
                  maxMonth={maxMonth}
                />
              );
            })}
          </Box>
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
