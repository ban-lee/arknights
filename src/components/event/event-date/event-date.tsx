import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { Center, Text } from '@mantine/core';
import { useRef } from 'react';

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);

interface EventDateProps {
  cnStart: Date | null;
  estimatedStart: Date | null;
  enStart: Date | null;
  enEnd: Date | null;
}

function fromIsoDayToLocal(date: Date) {
  // TODO: Fix the way dates are stored.
  const day = date.toISOString().split('T')[0];
  return new Date(`${day} 00:00:00-07:00`);
}

function fromIsoToLocalStart(date: Date) {
  // TODO: Fix the way dates are stored.
  // For now, take the day of the event start and use the hardcoded values for start time.
  const day = date.toISOString().split('T')[0];
  return new Date(`${day} 10:00:00-07:00`);
}

function fromIsoToLocalEnd(date: Date) {
  // TODO: Fix the way dates are stored.
  // For now, take the day of the event end and use the hardcoded values for end time.
  const day = date.toISOString().split('T')[0];
  return new Date(`${day} 03:59:00-07:00`);
}

export function EventDate({ enStart, enEnd, estimatedStart }: EventDateProps) {
  const estimatedDate = useRef<dayjs.Dayjs | undefined>(
    estimatedStart ? dayjs(fromIsoDayToLocal(estimatedStart)) : undefined
  ).current;
  const enStartDate = useRef<dayjs.Dayjs | undefined>(
    enStart ? dayjs(fromIsoToLocalStart(enStart)) : undefined
  ).current;
  const enEndDate = useRef<dayjs.Dayjs | undefined>(enEnd ? dayjs(fromIsoToLocalEnd(enEnd)) : undefined).current;

  const isStarted = useRef(!!enStartDate && dayjs().isAfter(enStartDate)).current;
  return (
    <>
      {!enStartDate && estimatedDate && (
        <Center>
          <Text
            weight="bold"
            mr={32}
          >
            Tentative Date
          </Text>
          <Text>{estimatedDate.format('ll')}</Text>
          <Text ml={4}>({dayjs().to(estimatedDate)})</Text>
        </Center>
      )}
      {enStartDate && (
        <Center>
          <Text>{enStartDate.format('ll')}</Text>
          {enEndDate && (
            <>
              <Text mx={4}>-</Text>
              <Text>{enEndDate.format('ll')}</Text>
            </>
          )}
          {!isStarted && <Text ml={4}>(starts {dayjs().to(enStartDate)})</Text>}
          {isStarted && enEndDate && <Text ml={4}>(ends {dayjs().to(enEndDate)})</Text>}
        </Center>
      )}
    </>
  );
}
