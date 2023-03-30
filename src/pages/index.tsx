import { Event as EventComponent } from '@/components/event';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { PrismaClient } from '@prisma/client';
import { Space, Stack, Title } from '@mantine/core';

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title={'AK: Upcoming Events'}>
        <Title align="center">Upcoming Events</Title>
        <Space h="xl" />
        <Stack
          align="center"
          spacing={40}
        >
          {events.map((event) => {
            return (
              <EventComponent
                key={event.id}
                event={event}
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

  return await prisma.event.findMany({
    orderBy: [{ estimatedStart: 'asc' }],
    include: {
      materials: true,
      freeOp: true,
      bannerOp: true,
      newSkin: true,
      freeSkin: true,
      rerunSkin: true,
    },
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
