import { Archetype, Operator } from '@/types/payload-types';
import { Text } from '@mantine/core';

interface OperatorProps {
  operator: Operator;
}

function getClass(operator: Operator): string {
  const archetype = operator.archetype as Archetype;

  return `(${archetype.class} - ${archetype.archetype})`;
}

export function Operator({ operator }: OperatorProps) {
  return (
    <Text>
      {operator.rarity}* - {operator.name} {getClass(operator)}
    </Text>
  );
}
