import { BackgroundImage, Box, Text } from '@mantine/core';
import { CloudinaryImage, MaterialEvent } from '@/types/keystone-types';
import { EventDate } from '@/components/event/event-date';

export function Summary({ event }: { event: MaterialEvent }) {
  return (
    <Box
      sx={() => ({
        height: 150,
        width: 300,

        display: 'flex',
      })}
    >
      <BackgroundImage
        src={(event.headerImg as unknown as CloudinaryImage)._meta.secure_url || ''}
        sx={{
          borderRadius: 10,

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[9],
            opacity: 0.75,
            padding: '0.5em',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          })}
        >
          <Text
            weight="bold"
            align="center"
          >
            {event.name}
          </Text>
          <EventDate
            estimatedStart={event.estimatedStart}
            enStart={event.enStart}
            enEnd={event.enEnd}
          />
        </Box>
      </BackgroundImage>
    </Box>
  );
}
