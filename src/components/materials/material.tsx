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
    <Tooltip
      label={`${material.rarity?.toUpperCase()}: ${material.name}`}
      events={{ hover: true, focus: true, touch: true }}
    >
      <BackgroundImage
        src={getBgUrl(material.rarity)}
        sx={{
          height: 60,
          maxWidth: 50,
          width: 50,
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
          alt={`Icon for ${material.name}`}
        />
      </BackgroundImage>
    </Tooltip>
  );
}
