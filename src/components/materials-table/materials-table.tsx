import Image from 'next/image';
import { Box, createStyles, Group, MantineTheme, Stack, Table, Text } from '@mantine/core';
import { CloudinaryImage } from '@/types/keystone-types';
import { EventDate } from '../event/event-date';
import { Material as MaterialComponent } from '../materials/material';
import { Material, Prisma } from '@prisma/client';
import { Theme } from '@emotion/react';
import { useEffect, useState } from 'react';

const event = Prisma.validator<Prisma.EventArgs>()({
  select: {
    id: true,
    name: true,
    estimatedStart: true,
    enStart: true,
    enEnd: true,
    headerImg: true,
    materials: true,
  },
});

type Event = Prisma.EventGetPayload<typeof event>;

interface Props {
  events: Event[];
  materials: Material[];
}

interface DisplayRow {
  event: Event;
  materialIndices: boolean[];
}

const useStyles = createStyles((theme: MantineTheme) => ({
  table: {
    minWidth: 1675,
    width: '100%',
    backgroundColor: theme.colors.gray[9],
  },
  eventCell: {
    position: 'relative',
    height: 125,
    maxWidth: 391,
    width: 391,

    '&:hover': {
      '> div:after': {
        opacity: 1,
      },
    },
  },
  eventCellDate: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: '4px 0',

    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      top: 0,
      height: '100%',
      width: '100%',

      backgroundColor: theme.colors.gray[9],
      opacity: 0.75,
    },
  },
}));

export function MaterialsTable({ events, materials }: Props) {
  const { classes } = useStyles();
  const [displayRows, setDisplayRows] = useState<DisplayRow[]>([]);
  const [displayCols, setDisplayCols] = useState<boolean[]>(Array(materials.length).fill(false));

  useEffect(() => {
    const newRows: DisplayRow[] = [];
    for (const event of events) {
      const row: DisplayRow = {
        event,
        materialIndices: Array(materials.length).fill(false),
      };

      for (const material of event.materials) {
        const index = materials.findIndex((mat) => mat.id === material.id);
        if (index < 0) throw new Error(`Could not find material [${material.id} - ${material.name}]`);

        row.materialIndices[index] = true;
        setDisplayCols((cols) => {
          cols[index] = true;
          return cols;
        });
      }

      newRows.push(row);
    }

    setDisplayRows(() => newRows);
  }, [events, materials]);

  return (
    <Box sx={{ padding: '0 24px' }}>
      <Table
        horizontalSpacing={0}
        verticalSpacing={0}
        withBorder
        withColumnBorders
        className={classes.table}
      >
        <tbody>
          {displayRows.map((row) => {
            return (
              <tr key={row.event.id}>
                <td className={classes.eventCell}>
                  <Image
                    src={(row.event.headerImg as unknown as CloudinaryImage)._meta.secure_url || ''}
                    alt={`${row.event.name} event banner`}
                    css={{
                      objectFit: 'cover',
                    }}
                    width={390}
                    height={125}
                    priority
                  />
                  <Box className={classes.eventCellDate}>
                    <Stack spacing={2}>
                      <Text
                        weight="bold"
                        align="center"
                        sx={() => ({ zIndex: 100 })}
                      >
                        {row.event.name}
                      </Text>
                      <Box sx={() => ({ zIndex: 100 })}>
                        <EventDate
                          cnStart={null}
                          estimatedStart={row.event.estimatedStart}
                          enStart={row.event.enStart}
                          enEnd={row.event.enEnd}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </td>
                {row.materialIndices.map((value, index) => {
                  if (!displayCols[index]) return <></>;

                  const mat = materials[index];
                  return (
                    <td
                      key={mat.id}
                      css={(theme: Theme) => ({
                        minWidth: 80,
                        borderRight: '1px solid ' + (theme as MantineTheme).colors.dark[9],
                      })}
                    >
                      <Group
                        align="center"
                        position="center"
                      >
                        {value && <MaterialComponent material={mat} />}
                      </Group>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
}
