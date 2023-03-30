import { Group } from '@mantine/core';
import { Material as MaterialComponent } from './material';
import { Material } from '@prisma/client';

interface MaterialsProps {
  materials: Material[];
}

export function Materials({ materials }: MaterialsProps) {
  return (
    <Group>
      {(materials as Material[]).map((mat) => {
        return (
          <MaterialComponent
            key={mat.id}
            material={mat}
          />
        );
      })}
    </Group>
  );
}
