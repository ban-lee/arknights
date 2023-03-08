import Image from 'next/image';
import { AkIcon, Material } from '@/types/payload-types';
import { Group } from '@mantine/core';

interface MaterialsProps {
  materials: Material[];
}

export function Materials({ materials }: MaterialsProps) {
  return (
    <Group>
      {(materials as Material[]).map((mat) => {
        return (
          <Image
            key={mat.id}
            src={(mat.icon as AkIcon).url || ''}
            width={((mat.icon as AkIcon).width || 0) / 4}
            height={((mat.icon as AkIcon).height || 0) / 4}
            alt={`${mat.name} icon`}
          />
        );
      })}
    </Group>
  );
}
