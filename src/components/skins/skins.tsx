import Image from 'next/image';
import { Grid, Group, Text } from '@mantine/core';
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
    <Grid align="center">
      {freeSkin && (
        <>
          <Grid.Col span={3}>
            <Text weight="bold">Free Skin</Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <Skin skin={freeSkin} />
          </Grid.Col>
        </>
      )}
      {newSkins.length > 0 && (
        <>
          <Grid.Col span={3}>
            <Text weight="bold">New Skins</Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <Group>
              {newSkins.map((skin) => (
                <Skin
                  key={skin.id}
                  skin={skin}
                />
              ))}
            </Group>
          </Grid.Col>
        </>
      )}
      {rerunSkins.length > 0 && (
        <>
          <Grid.Col span={3}>
            <Text weight="bold">Rerun Skins</Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <Group>
              {rerunSkins.map((skin) => (
                <Skin
                  key={skin.id}
                  skin={skin}
                />
              ))}
            </Group>
          </Grid.Col>
        </>
      )}
      {fashionReview && (
        <>
          <Grid.Col span={3}>
            <Text weight="bold"></Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <Image
              src="/ui/fashion_review-cropped.png"
              alt="Rhodes Fashion Review"
              width={452}
              height={115}
            />
            {/* <Text weight="bold">Rhodes Fashion Review</Text> */}
          </Grid.Col>
        </>
      )}
    </Grid>
  );
}
