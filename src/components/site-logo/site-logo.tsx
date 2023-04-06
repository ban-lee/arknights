import Image from 'next/image';
import { Box, Stack } from '@mantine/core';

export function SiteLogo() {
  return (
    <Stack
      align="center"
      my={16}
    >
      <Box>
        <Image
          src="/karlan-trade.webp"
          alt="Karlan Tools Logo (which is just the Karlan Trade Logo)"
          height={75}
          width={75}
          priority
        />
      </Box>
      <Image
        src="/karlan-tools-text.webp"
        alt="Karlan Tools"
        height={16}
        width={394 / 2}
        priority
      />
    </Stack>
  );
}
