import { Box, Space, Text, Title } from '@mantine/core';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { MaterialsTable } from '@/components/materials-table';
import { prisma } from '@/utils/prisma';

export default function Home({ events, materials }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title={'Karlan Tools: Upcoming Farming Materials'}>
        <Box py={32}>
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
          <MaterialsTable
            events={events}
            materials={materials}
          />
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
