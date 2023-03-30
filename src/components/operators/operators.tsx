import { Divider, Grid, Stack, Text } from '@mantine/core';
import { Operator as OperatorComponent } from './operator';
import { Operator } from '@prisma/client';
import { useRef } from 'react';

interface OperatorsProps {
  newOps: Operator[];
  freeOp: Operator | null;
}

export function Operators({ newOps, freeOp }: OperatorsProps) {
  const hasDivier = useRef(!!(newOps.length && freeOp)).current;

  return (
    <Grid align="center">
      {newOps.length > 0 && (
        <>
          <Grid.Col span={2}>
            <Text weight="bold">Banner</Text>
          </Grid.Col>
          <Grid.Col span={10}>
            <Stack>
              {newOps.map((op) => {
                return (
                  <OperatorComponent
                    key={op.id}
                    operator={op}
                  />
                );
              })}
            </Stack>
          </Grid.Col>
        </>
      )}
      {hasDivier && (
        <Grid.Col span={12}>
          <Divider />
        </Grid.Col>
      )}
      {freeOp && (
        <>
          <Grid.Col span={2}>
            <Text weight="bold">Free</Text>
          </Grid.Col>
          <Grid.Col span={10}>
            <OperatorComponent operator={freeOp} />
          </Grid.Col>
        </>
      )}
    </Grid>
  );
}
