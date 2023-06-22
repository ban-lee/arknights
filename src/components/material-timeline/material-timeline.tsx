import { Box } from '@mantine/core';
import { MaterialEvent } from '@/types/keystone-types';
import { nanoid } from 'nanoid';

interface Props {
  matId: string;
  events: MaterialEvent[];
  maxMonth: number;
}

const DOT_SIZE = 24;

function EventDot({ event }: { event: MaterialEvent }) {
  return (
    <Box
      sx={{
        background: event.topColour,
        borderRadius: 24,
        height: DOT_SIZE,
        width: DOT_SIZE,

        textAlign: 'center',
      }}
    >
      {(event.estimatedStart || event.enStart)!.getMonth()}
    </Box>
  );
}

/**
 * Generates an array that maps the indices of an array to the month it corresponds to where the first index is the
 * current month.
 */
function generateOffset(maxMonth: number) {
  const offset: { index: number; month: number }[] = [];
  const thisMonth = new Date().getMonth();

  for (let i = 0; i < 12; i++) {
    const month = (thisMonth + i) % 12;

    offset.push({
      index: i,
      month,
    });

    if (month === maxMonth) break;
  }

  return offset;
}

export function MaterialTimeline({ matId, events, maxMonth }: Props) {
  const timelineOffset = generateOffset(maxMonth);
  const timeline: MaterialEvent[] = initTimeline();

  function initTimeline() {
    const newTimeline: MaterialEvent[] = new Array(12);
    for (const event of events) {
      const hasMaterialDrop = event.materials.some((m) => m.id === matId);
      if (!hasMaterialDrop) continue;

      const month = (event.enStart ?? event.estimatedStart)!.getMonth();
      const index = timelineOffset.find((entry) => entry.month === month)!.index;

      newTimeline[index] = event;
    }

    return newTimeline;
  }

  function generateGridColumns() {
    return timelineOffset.map(() => `${DOT_SIZE}px`).join(' minmax(0.5em, 1fr) ');
  }

  return (
    <Box
      sx={{
        height: 60,
        width: '100%',

        display: 'grid',
        gridTemplateColumns: generateGridColumns(),
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
      {timeline.map((event, index) => {
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
            {event && <EventDot event={event} />}
          </Box>
        );
      })}
    </Box>
  );
}
