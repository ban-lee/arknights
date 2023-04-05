import { EventBannerTypeType, Operator } from '@prisma/client';
import { getBannerTypeLabel } from '@/utils/operator';
import { Grid, Group, Text } from '@mantine/core';
import { Operator as OperatorComponent } from './operator';
import { useRef } from 'react';

interface OperatorsProps {
  newOps: Operator[];
  freeOp: Operator | null;
  bannerType: EventBannerTypeType;
}

export function Operators({ newOps, freeOp, bannerType }: OperatorsProps) {
  const hasDivier = useRef(!!(newOps.length && freeOp)).current;

  return (
    <Grid align="center">
      {newOps.length > 0 && (
        <>
          <Grid.Col span={3}>
            <Text weight="bold">Banner Operators</Text>
            <Text>{getBannerTypeLabel(bannerType)}</Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <Group>
              {newOps.map((op) => {
                return (
                  <OperatorComponent
                    key={op.id}
                    operator={op}
                  />
                );
              })}
            </Group>
          </Grid.Col>
        </>
      )}
      {freeOp && (
        <>
          <Grid.Col span={3}>
            <Text weight="bold">Free Operator</Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <OperatorComponent operator={freeOp} />
          </Grid.Col>
        </>
      )}
    </Grid>
  );
}
