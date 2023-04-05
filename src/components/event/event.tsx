import Image from 'next/image';
import { Card, Divider, Grid, Text, Title } from '@mantine/core';
import { CloudinaryImage } from '@/types/keystone-types';
import { EventDate } from './event-date';
import { isLight } from '@/utils/colour';
import { Material, Prisma } from '@prisma/client';
import { Materials } from '@/components/materials';
import { Operators } from '@/components/operators';
import { Skins } from '@/components/skins';
import { useRef } from 'react';

const fullEvent = Prisma.validator<Prisma.EventArgs>()({
  include: {
    materials: true,
    freeOp: true,
    bannerOp: true,
    newSkin: { include: { operator: true } },
    freeSkin: { include: { operator: true } },
    rerunSkin: { include: { operator: true } },
  },
});

type FullEvent = Prisma.EventGetPayload<typeof fullEvent>;

interface EventProps {
  event: FullEvent;
  isPriority: boolean;
}

function getHeaderFontColour(headerBgColour: string): string {
  if (!headerBgColour) return 'light';

  return isLight(headerBgColour) ? 'dark' : 'light';
}

export function Event({ event, isPriority }: EventProps) {
  const headerBgColour = useRef<string>(event.topColour || '').current;
  const headerFontColour = useRef<string>(getHeaderFontColour(headerBgColour)).current;

  const hasOperators = useRef(event.freeOp || event.bannerOp.length > 0).current;
  const hasSkins = useRef(event.freeSkin || event.newSkin.length > 0 || event.rerunSkin.length > 0).current;
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
              priority={isPriority}
            />
          </Card.Section>
        )}
        <Card.Section
          mb={16}
          pb={12}
          sx={(theme) => ({
            backgroundColor: headerBgColour,
            color: headerFontColour === 'light' ? theme.white : theme.black,
          })}
        >
          <Title
            order={2}
            align="center"
            sx={{ padding: '12px 0 4px 0' }}
          >
            {event.name}
          </Title>
          <EventDate
            cnStart={event.cnStart}
            estimatedStart={event.estimatedStart}
            enStart={event.enStart}
            enEnd={event.enEnd}
          />
        </Card.Section>
        <Grid align="center">
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
          {hasOperators && (
            <>
              <Grid.Col span={12}>
                <Operators
                  freeOp={event.freeOp}
                  newOps={event.bannerOp}
                  bannerType={event.bannerType}
                />
              </Grid.Col>
            </>
          )}
          {hasOperators && hasSkins && (
            <Grid.Col span={12}>
              <Divider />
            </Grid.Col>
          )}
          {hasSkins && (
            <>
              <Grid.Col span={12}>
                <Skins
                  freeSkin={event.freeSkin}
                  newSkins={event.newSkin}
                  rerunSkins={event.rerunSkin}
                  fashionReview={event.fashionReview}
                />
              </Grid.Col>
            </>
          )}
        </Grid>
      </Card>
    </>
  );
}
