import { Box } from '@mantine/core';
import { MaterialEvent } from '@/types/keystone-types';
import { nanoid } from 'nanoid';
import { Pip, PIP_SIZE } from './pip';

interface Props {
  events: MaterialEvent[];
}

function generateGridColumns(numCols: number) {
  return new Array(numCols)
    .fill(0)
    .map(() => `${PIP_SIZE}px`)
    .join(' minmax(0.5em, 1fr) ');
}

export function MaterialTimeline({ events }: Props) {
  return (
    <Box
      sx={{
        height: 60,
        width: '100%',

        display: 'grid',
        gridTemplateColumns: generateGridColumns(events.length),
      }}
    >
      <Box
        sx={{
          gridColumn: '1 / -1',
          gridRow: 1,

          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={(theme) => ({
            background: theme.colors.gray[7],
            borderRadius: 5,
            height: 5,
            width: '100%',
          })}
        >
          &nbsp;
        </Box>
      </Box>
      {events.map((event, index) => {
        return (
          <Box
            key={nanoid()}
            sx={{
              gridColumn: index * 2 + 1,
              gridRow: 1,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {event && <Pip event={event} />}
          </Box>
        );
      })}
    </Box>
  );
}
