import Image from 'next/image';
import { Box, Card, Divider, Title, useMantineTheme } from '@mantine/core';
import { CloudinaryImage, FullEvent } from '@/types/keystone-types';
import { EventDate } from './event-date';
import { Materials } from '@/components/materials';
import { Operators } from '@/components/operators';
import { Skins } from '@/components/skins';
import { smallOrMore } from '@/utils/media-query';
import { useTopColour } from '@/hooks/useTopColour';

interface EventProps {
  event: FullEvent;
  isPriority: boolean;
}

export function Event({ event, isPriority }: EventProps) {
  const theme = useMantineTheme();
  const [headerBgColour, headerFontColour] = useTopColour(event.topColour);

  const hasOperators = event.freeOp || event.bannerOp.length > 0;
  const hasSkins = event.freeSkin || event.newSkin.length > 0 || event.rerunSkin.length > 0;
  return (
    <Card
      sx={{
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
      <Card.Section pb="2em">
        {event.materials.length > 0 && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em' }}>
              <Title order={3}>Farming Materials</Title>
              <Materials materials={event.materials} />
            </Box>

            {(hasOperators || hasSkins) && <Divider my={'1em'} />}
          </>
        )}
        {hasOperators && (
          <Operators
            freeOp={event.freeOp}
            newOps={event.bannerOp}
            bannerType={event.bannerType}
          />
        )}
        {hasOperators && hasSkins && <Divider my={'1em'} />}
        {hasSkins && (
          <Skins
            freeSkin={event.freeSkin}
            newSkins={event.newSkin}
            rerunSkins={event.rerunSkin}
            fashionReview={event.fashionReview}
          />
        )}
      </Card.Section>
    </Card>
  );
}
