import Image from 'next/image';
import { Box, Text, Tooltip } from '@mantine/core';
import { getBrandMetadata } from '@/utils/brand';
import { getRarityColour } from '@/utils/operator';
import { ImageNotFound } from '../image-not-found';
import { Prisma } from '@prisma/client';
import { useRef, useState } from 'react';

const skinWithOp = Prisma.validator<Prisma.SkinArgs>()({
  include: {
    operator: true,
  },
});

type SkinWithOp = Prisma.SkinGetPayload<typeof skinWithOp>;

interface SkinProps {
  skin: SkinWithOp;
}

export function Skin({ skin }: SkinProps) {
  const [imageAvailable, setImageAvailable] = useState(true);
  const brandMetadata = useRef(getBrandMetadata(skin?.brand)).current;

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',

        backgroundColor: theme.colors.gray[8],
        position: 'relative',
        padding: 10,
        height: 175,
        width: 140,
      })}
    >
      <Box
        sx={() => ({
          position: 'absolute',
          top: 10,
          zIndex: 10,
        })}
      >
        <Image
          src={brandMetadata.logo}
          alt={brandMetadata.label}
          width={140}
          height={175}
          css={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        sx={{
          zIndex: 100,
        }}
      >
        {imageAvailable && (
          <Image
            src={`/avatars/${skin.imgId.replace('#', '%23')}.png`}
            alt={skin.name}
            width={120}
            height={120}
            css={{
              objectFit: 'contain',
              zIndex: 100,
            }}
            onError={() => setImageAvailable(false)}
          />
        )}
        {!imageAvailable && <ImageNotFound />}
        <Tooltip label={skin.operator!.name}>
          <Text
            size="xs"
            truncate
            align="center"
            color="dark"
            sx={{
              backgroundColor: getRarityColour(skin.operator!.rarity),
              width: 120,
              padding: '3px 3px 1px 3px',
            }}
          >
            {skin.operator!.name}
          </Text>
        </Tooltip>
      </Box>
    </Box>
  );
}
