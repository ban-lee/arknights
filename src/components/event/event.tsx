import Image from 'next/image';
import { Card, Divider, Grid, Text, Title, useMantineTheme } from '@mantine/core';
import { CloudinaryImage, FullEvent } from '@/types/keystone-types';
import { EventDate } from './event-date';
import { Materials } from '@/components/materials';
import { Operators } from '@/components/operators';
import { Skins } from '@/components/skins';
import { smallOrMore } from '@/utils/media-query';
import { useRef } from 'react';
import { useTopColour } from '@/hooks/useTopColour';

interface EventProps {
  event: FullEvent;
  isPriority: boolean;
}

export function Event({ event, isPriority }: EventProps) {
  const theme = useMantineTheme();
  const [headerBgColour, headerFontColour] = useTopColour(event.topColour);

  const hasOperators = useRef(event.freeOp || event.bannerOp.length > 0).current;
  const hasSkins = useRef(event.freeSkin || event.newSkin.length > 0 || event.rerunSkin.length > 0).current;
  return (
    <Card
      sx={{
        marginInline: '2em',
        maxWidth: 780,
        width: '100%',
      }}
    >
      {event.headerImg && (
        <Card.Section
          sx={{
            height: 150,
            position: 'relative',

            [`@media ${smallOrMore(theme)}`]: {
              height: 250,
            },
          }}
        >
          <Image
            src={(event.headerImg as unknown as CloudinaryImage)._meta.secure_url || ''}
            css={{
              objectFit: 'cover',
            }}
            fill
            sizes={`
              ${smallOrMore(theme)} 66vw,
              100vw
            `}
            alt={`${event.name} event banner`}
            priority={isPriority}
          />
        </Card.Section>
      )}
      <Card.Section
        mb={16}
        pb={12}
        sx={() => ({
          backgroundColor: headerBgColour,
          color: headerFontColour,
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
              <Materials materials={event.materials} />
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
  );
}
