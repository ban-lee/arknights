import Image from 'next/image';
import { Center, createStyles, useMantineTheme } from '@mantine/core';

const useStyles = createStyles({
  logo: { display: 'none' },
});

export function SiteLogoVertical() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Center>
      <Image
        src="/logo/logo-vertical-large.webp"
        alt="Karlan Tools Logo"
        width={200}
        height={100}
        priority
      />
    </Center>
  );
}
