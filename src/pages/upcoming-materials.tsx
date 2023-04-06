import Image from 'next/image';
import { Box, Card, Group, Space, Stack, Text, Title } from '@mantine/core';
import { CloudinaryImage } from '@/types/keystone-types';
import { EventDate } from '@/components/event/event-date';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { Materials } from '@/components/materials';
import { prisma } from '@/utils/prisma';

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title={'Karlan Tools: Upcoming Farming Materials'}>
        <Box
          py={32}
          sx={{ width: 780, margin: '0 auto' }}
        >
          <Title align="center">Upcoming Farming Materials</Title>
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
            spacing={16}
          >
            {events.map((event) => {
              return (
                <Card key={event.id}>
                  <Group>
                    <Stack>
                      <Image
                        src={(event.headerImg as unknown as CloudinaryImage)._meta.secure_url || ''}
                        css={{
                          objectFit: 'cover',
                        }}
                        width={780 / 2}
                        height={250 / 2}
                        alt={`${event.name} event banner`}
                      />
                      <EventDate
                        cnStart={null}
                        estimatedStart={event.estimatedStart}
                        enStart={event.enStart}
                        enEnd={event.enEnd}
                      />
                    </Stack>
                    <Materials materials={event.materials} />
                  </Group>
                </Card>
              );
            })}
          </Stack>
        </Box>
      </Layout>
    </>
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
      materials: true,
    },
    where: {
      materials: { some: {} },
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
