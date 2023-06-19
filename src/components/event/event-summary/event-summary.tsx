import Image from 'next/image';
import { Card, Title, useMantineTheme } from '@mantine/core';
import { CloudinaryImage, FullEvent } from '@/types/keystone-types';
import { EventDate } from '../event-date';
import { smallOrMore } from '@/utils/media-query';
import { useTopColour } from '@/hooks/useTopColour';

interface Props {
  event: FullEvent;
}

export function EventSummary({ event }: Props) {
  const theme = useMantineTheme();
  const [headerBgColour, headerFontColour] = useTopColour(event.topColour);

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
            priority={true}
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
    </Card>
  );
}
