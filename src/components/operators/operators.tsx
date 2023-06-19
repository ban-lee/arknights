import { Box, Group, Text, Title } from '@mantine/core';
import { EventBannerTypeType, Operator } from '@prisma/client';
import { getBannerTypeLabel } from '@/utils/operator';
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
    <Box
      sx={{
        textAlign: 'center',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1em',
      }}
    >
      {newOps.length > 0 && (
        <>
          <div>
            <Title order={3}>Banner Operators</Title>
            <Text>{getBannerTypeLabel(bannerType)}</Text>
          </div>
          <Group position="center">
            {newOps.map((op) => {
              return (
                <OperatorComponent
                  key={op.id}
                  operator={op}
                />
              );
            })}
          </Group>
        </>
      )}
      {freeOp && (
        <>
          <Title order={3}>Free Operator</Title>
          <OperatorComponent operator={freeOp} />
        </>
      )}
    </Box>
  );
}
