import Image from 'next/image';
import { Box } from '@mantine/core';

interface Props {
  size: 'sm' | 'md';
}

export function SiteLogo({ size }: Props) {
  return (
    <>
      <Box>
        <Image
          src="/karlan-tools-2.webp"
          alt="Karlan Tools Logo"
          height={size === 'sm' ? 50 : 75}
          width={size === 'sm' ? 50 : 75}
          priority
        />
      </Box>
      <Image
        src="/karlan-tools-text-2.webp"
        alt="Karlan Tools Co., LTD."
        height={size === 'sm' ? 10 : 16}
        width={size === 'sm' ? 131 : 197}
        priority
      />
    </>
  );
}
