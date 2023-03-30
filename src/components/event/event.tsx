import dayjs from 'dayjs';
import Image from 'next/image';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { Card, Grid, Group, Text, Title } from '@mantine/core';
import { CloudinaryImage } from '@/types/keystone-types';
import { isLight } from '@/utils/colour';
import { Material, Operator, Prisma } from '@prisma/client';
import { Materials } from '@/components/materials';
import { Operators } from '../operators';
import { useRef } from 'react';

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);

const fullEvent = Prisma.validator<Prisma.EventArgs>()({
  include: {
    materials: true,
    freeOp: true,
    bannerOp: true,
    newSkin: true,
    freeSkin: true,
    rerunSkin: true,
  },
});

type FullEvent = Prisma.EventGetPayload<typeof fullEvent>;

interface EventProps {
  event: FullEvent;
}

function getHeaderFontColour(headerBgColour: string): string {
  if (!headerBgColour) return 'light';

  return isLight(headerBgColour) ? 'dark' : 'light';
}

export function Event({ event }: EventProps) {
  const estimatedStart = useRef<dayjs.Dayjs | undefined>(
    event.estimatedStart ? dayjs(event.estimatedStart) : undefined
  ).current;
  const headerBgColour = useRef<string>(event.topColour || '').current;
  const headerFontColour = useRef<string>(getHeaderFontColour(headerBgColour)).current;

  return (
    <>
      <Card
        sx={{
          width: 780,
        }}
      >
        {event.headerImg && (
          <Card.Section>
            <Image
              src={(event.headerImg as unknown as CloudinaryImage)._meta.secure_url || ''}
              css={{
                objectFit: 'cover',
              }}
              width={780}
              height={250}
              alt={`${event.name} event banner`}
            />
          </Card.Section>
        )}
        <Card.Section mb={16}>
          <Title
            order={2}
            align="center"
            py={12}
            color={headerFontColour}
            sx={{
              backgroundColor: headerBgColour,
            }}
          >
            {event.name}
          </Title>
        </Card.Section>
        <Grid align="center">
          {estimatedStart && (
            <>
              <Grid.Col span={3}>
                <Text weight="bold">Tentative EN</Text>
              </Grid.Col>
              <Grid.Col span={9}>
                <Group>
                  <Text>{estimatedStart.format('ll')}</Text>
                  <Text>({dayjs().to(estimatedStart)})</Text>
                </Group>
              </Grid.Col>
            </>
          )}
          {event.materials.length > 0 && (
            <>
              <Grid.Col span={3}>
                <Text weight="bold">Farming Materials</Text>
              </Grid.Col>
              <Grid.Col span={9}>
                <Materials materials={(event.materials || []) as Material[]} />
              </Grid.Col>
            </>
          )}
          {(event.bannerOp || event.freeOp) && (
            <>
              <Grid.Col span={3}>
                <Text weight="bold">New Operators</Text>
              </Grid.Col>
              <Grid.Col span={9}>
                <Operators
                  freeOp={event.freeOp}
                  newOps={event.bannerOp}
                />
              </Grid.Col>
            </>
          )}
        </Grid>
      </Card>
    </>
  );
}
