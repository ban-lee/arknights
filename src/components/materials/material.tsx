import Image from 'next/image';
import { AkIcon, Material } from '@/types/payload-types';
import { BackgroundImage, Tooltip } from '@mantine/core';

interface MaterialProps {
  material: Material;
}

function getBgUrl(rarity: string | undefined): string {
  return `/item-bg/t${rarity}.png`;
}

export function Material({ material }: MaterialProps) {
  return (
    <Tooltip label={material.name}>
      <BackgroundImage
        src={getBgUrl(material.rarity)}
        sx={{
          height: 60,
          maxWidth: 60,
          width: 60,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Image
          key={material.id}
          src={(material.icon as AkIcon).url || ''}
          width={40}
          height={40}
          css={{
            objectFit: 'contain',
          }}
          alt={`${material.name} icon`}
        />
      </BackgroundImage>
    </Tooltip>
  );
}
