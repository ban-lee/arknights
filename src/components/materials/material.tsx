import Image from 'next/image';
import { BackgroundImage, Tooltip } from '@mantine/core';
import { Material, MaterialRarityType } from '@prisma/client';

interface MaterialProps {
  material: Material;
}

function getBgUrl(rarity: MaterialRarityType | null): string {
  return `/items/item-bg/${rarity}.png`;
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
          src={`/items/${material.imgId}.png` || ''}
          width={50}
          height={50}
          css={{
            objectFit: 'contain',
          }}
          alt={`${material.name} icon`}
        />
      </BackgroundImage>
    </Tooltip>
  );
}
