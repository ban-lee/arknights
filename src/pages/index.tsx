import { Box, Card, Center, Space, Text, Title } from '@mantine/core';
import { EventSummary } from '@/components/event/event-summary';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { prisma } from '@/utils/prisma';

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const hasRunningEvent = events && events.length > 0;

  return (
    <>
      <Layout title={'Karlan Tools'}>
        <Box
          sx={{
            padding: '3em 2em',
          }}
        >
          <Title
            order={1}
            align="center"
          >
            Karlan Tools
          </Title>
          <Space h="xl" />

          {hasRunningEvent && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2em',
              }}
            >
              {events.map((event) => (
                <EventSummary
                  key={event.id}
                  event={event}
                />
              ))}
            </Box>
          )}
          {!hasRunningEvent && (
            <Card
              py={50}
              sx={() => ({
                margin: '2em auto',
                maxWidth: 780,
                textAlign: 'center',
                width: '100%',
              })}
            >
              <Title order={2}>Dead Time</Title>
              <Space h="sm" />
              <Text>Currently no events are happening</Text>
            </Card>
          )}
        </Box>
      </Layout>
    </>
  );
}

async function getRunningEvent() {
  return await prisma.event
    .findMany({
      orderBy: [{ enStart: 'asc' }],
      include: {
        materials: true,
        freeOp: true,
        bannerOp: true,
        newSkin: { include: { operator: true } },
        freeSkin: { include: { operator: true } },
        rerunSkin: { include: { operator: true } },
      },
      where: {
        // Event that hasn't ended in global.
        enEnd: { gte: new Date().toISOString() },
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
  const events = await getRunningEvent();

  return {
    props: {
      events,
    },
  };
}
