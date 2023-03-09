import dayjs from 'dayjs';
import Image from 'next/image';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { AkHeader, Event, Material, Operator } from '@/types/payload-types';
import { Card, Grid, Group, Text, Title } from '@mantine/core';
import { isLight } from '@/utils/colour';
import { Materials } from '@/components/materials';
import { Operators } from '../operators';
import { useRef } from 'react';

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);

interface EventProps {
  event: Event;
}

function getHeaderFontColour(headerBgColour: string): string {
  if (!headerBgColour) return 'light';

  return isLight(headerBgColour) ? 'dark' : 'light';
}

export function Event({ event }: EventProps) {
  const estimatedStart = useRef<dayjs.Dayjs | undefined>(
    event.dates.estimatedStart ? dayjs(event.dates.estimatedStart) : undefined
  ).current;
  const headerBgColour = useRef<string>((event.header as AkHeader).topColour || '').current;
  const headerFontColour = useRef<string>(getHeaderFontColour(headerBgColour)).current;

  return (
    <>
      <Card
        sx={{
          width: 780,
        }}
      >
        {event.header && (
          <Card.Section>
            <Image
              src={(event.header as AkHeader).url || ''}
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
          {event.materials && (
            <>
              <Grid.Col span={3}>
                <Text weight="bold">Farming Materials</Text>
              </Grid.Col>
              <Grid.Col span={9}>
                <Materials materials={(event.materials || []) as Material[]} />
              </Grid.Col>
            </>
          )}
          {(event.new?.newOperators || event.free?.freeOperators) && (
            <>
              <Grid.Col span={3}>
                <Text weight="bold">New Operators</Text>
              </Grid.Col>
              <Grid.Col span={9}>
                <Operators
                  newOps={(event.new.newOperators as Operator[]) || []}
                  freeOp={event.free.freeOperators as Operator | undefined}
                />
              </Grid.Col>
            </>
          )}
        </Grid>
      </Card>
    </>
  );
}
