import { Group } from '@mantine/core';
import { InferGetServerSidePropsType } from 'next';
import { PrismaClient } from '@prisma/client';
import { Skin } from '@/components/skins';

export default function Skins({ skins }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Group
      my={20}
      position="center"
    >
      {skins.map((skin) => (
        <Skin
          key={skin.id}
          skin={skin}
        />
      ))}
    </Group>
  );
}

async function getSkins() {
  const prisma = new PrismaClient();

  return await prisma.skin.findMany({
    orderBy: [{ operator: { rarity: 'desc' } }, { operator: { name: 'asc' } }],
    include: {
      operator: true,
    },
  });
}

export async function getServerSideProps() {
  const skins = await getSkins();

  return {
    props: {
      skins,
    },
  };
}
