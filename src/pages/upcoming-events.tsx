import { Box, Space, Stack, Text, Title } from '@mantine/core';
import { Event as EventComponent } from '@/components/event';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { prisma } from '@/utils/prisma';

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title={'Karlan Tools: Upcoming AK Events'}>
        <Box py={32}>
          <Title align="center">Upcoming Events</Title>
          <Space h="xl" />
          <Text
            align="center"
            sx={{
              maxWidth: 800,
              margin: 'auto',
            }}
          >
            Tentative start dates powered by hopes and dreams.
            <br />
            Until announced officially by Yostar, it is all guess work.
          </Text>
          <Space h="xl" />
          <Stack
            align="center"
            spacing={40}
          >
            {events.map((event, index) => {
              return (
                <EventComponent
                  key={event.id}
                  event={event}
                  isPriority={index <= 3}
                />
              );
            })}
          </Stack>
        </Box>
      </Layout>
    </>
  );
}

async function getEvents() {
  return await prisma.event
    .findMany({
      orderBy: [{ estimatedStart: 'asc' }],
      include: {
        materials: true,
        freeOp: true,
        bannerOp: true,
        newSkin: { include: { operator: true } },
        freeSkin: { include: { operator: true } },
        rerunSkin: { include: { operator: true } },
      },
      where: {
        OR: [
          {
            enEnd: { gte: new Date().toISOString() },
          },
          {
            enEnd: { equals: null },
          },
        ],
      },
    })
    .then((events) => {
      for (const event of events) {
        event.bannerOp.sort((a, b) => b.rarity - a.rarity);
      }
      return events;
    });
}

export async function getServerSideProps() {
  const events = await getEvents();

  return {
    props: {
      events,
    },
  };
}
