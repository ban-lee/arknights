import { Operator } from '@prisma/client';
import { Text } from '@mantine/core';

interface OperatorProps {
  operator: Operator;
}

function getClass(operator: Operator): string {
  return `(${operator.class} - ${operator.archetype})`;
}

export function Operator({ operator }: OperatorProps) {
  return (
    <Text>
      {operator.rarity}* - {operator.name} {getClass(operator)}
    </Text>
  );
}
