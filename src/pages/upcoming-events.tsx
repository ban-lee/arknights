import { Box, Text, Title } from '@mantine/core';
import { Event as EventComponent } from '@/components/event';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { prisma } from '@/utils/prisma';

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout
        title={'Karlan Tools: Upcoming AK Events'}
        centerMain
      >
        <>
          <Title
            sx={{
              textAlign: 'center',
              marginBlock: '1.5em 0.75em',
            }}
          >
            Upcoming Events
          </Title>
          <Text
            align="center"
            sx={{
              margin: '2em auto 1.75em',
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
              alignItems: 'center',
              gap: '3em',
            }}
            w={{ base: '100vw', sm: '100%' }}
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
          </Box>
        </>
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
          // Events that only have tentative dates.
          {
            enStart: { equals: null },
          },
          // Events that haven't ended in global.
          {
            enEnd: { gte: new Date().toISOString() },
          },
          // Events that have release date but no time period.
          {
            AND: [{ enStart: { gte: new Date().toISOString() } }, { enEnd: { equals: null } }],
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
