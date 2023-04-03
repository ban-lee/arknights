import Image from 'next/image';
import { Box, Text, Tooltip } from '@mantine/core';
import { getRarityColour } from '@/utils/operator';
import { ImageNotFound } from '@/components/image-not-found';
import { Operator } from '@prisma/client';
import { OperatorClass } from './operator-class';
import { useState } from 'react';

interface OperatorProps {
  operator: Operator;
}

export function Operator({ operator }: OperatorProps) {
  const [imageAvailable, setImageAvailable] = useState(true);
  return (
    <>
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
        <OperatorClass operator={operator} />
        <Box
          sx={() => ({
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10,
          })}
        >
          <Image
            src={`/ui/rarity/header-${operator.rarity}.png`}
            alt={`${operator.rarity}-star operator`}
            width="140"
            height="37"
            css={{
              objectFit: 'contain',
            }}
          />
        </Box>
        {imageAvailable && (
          <Image
            src={`/avatars/${operator.charId}.png`}
            alt={`Avatar for ${operator.name}`}
            width={120}
            height={120}
            css={{
              marginTop: 10,
              objectFit: 'contain',
            }}
            onError={() => setImageAvailable(false)}
          />
        )}
        {!imageAvailable && <ImageNotFound />}
        <Tooltip label={operator.name}>
          <Text
            size="xs"
            truncate
            align="center"
            color="dark"
            sx={{
              backgroundColor: getRarityColour(operator.rarity),
              width: 120,
              padding: '3px 3px 1px 3px',
            }}
          >
            {operator.name}
          </Text>
        </Tooltip>
      </Box>
    </>
  );
}
