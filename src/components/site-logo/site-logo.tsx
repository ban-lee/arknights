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
          src="/karlan-tools-2.webp"
          alt="Karlan Tools Logo"
          height={75}
          width={75}
          priority
        />
      </Box>
      <Image
        src="/karlan-tools-text-2.webp"
        alt="Karlan Tools Logo Text"
        height={16}
        width={197}
        priority
      />
    </Stack>
  );
}
