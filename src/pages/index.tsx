import { Event as EventComponent } from '@/components/event';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { PrismaClient } from '@prisma/client';
import { Space, Stack, Title } from '@mantine/core';

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title={'Karlan Tools: Upcoming AK Events'}>
        <Title align="center">Upcoming Events</Title>
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
      </Layout>
    </>
  );
}

async function getEvents() {
  const prisma = new PrismaClient();

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
