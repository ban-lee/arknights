import Image from 'next/image';
import { Box, Group, Title } from '@mantine/core';
import { Prisma } from '@prisma/client';
import { Skin } from './skin';

const skinWithOp = Prisma.validator<Prisma.SkinArgs>()({
  include: {
    operator: true,
  },
});

type SkinWithOp = Prisma.SkinGetPayload<typeof skinWithOp>;

interface SkinsProps {
  freeSkin: SkinWithOp | null;
  newSkins: SkinWithOp[];
  rerunSkins: SkinWithOp[];
  fashionReview: boolean;
}

export function Skins({ freeSkin, newSkins, rerunSkins, fashionReview }: SkinsProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1em',
      }}
    >
      {freeSkin && (
        <>
          <Title order={3}>Free Skin</Title>
          <Skin skin={freeSkin} />
        </>
      )}
      {newSkins.length > 0 && (
        <>
          <Title order={3}>New Skins</Title>
          <Group position="center">
            {newSkins.map((skin) => (
              <Skin
                key={skin.id}
                skin={skin}
              />
            ))}
          </Group>
        </>
      )}
      {rerunSkins.length > 0 && (
        <>
          <Title order={3}>Rerun Skins</Title>
          <Group position="center">
            {rerunSkins.map((skin) => (
              <Skin
                key={skin.id}
                skin={skin}
              />
            ))}
          </Group>
        </>
      )}
      {fashionReview && (
        <>
          <Image
            src="/ui/fashion_review-cropped.png"
            alt="Rhodes Fashion Review"
            width={452}
            height={115}
          />
        </>
      )}
    </Box>
  );
}
