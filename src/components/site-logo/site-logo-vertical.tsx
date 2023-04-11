import Image from 'next/image';
import { Center, createStyles, MediaQuery, useMantineTheme } from '@mantine/core';
import { moreThanMedium } from '@/utils/media-query';

const useStyles = createStyles({
  logo: { display: 'none' },
});

export function SiteLogoVertical() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Center>
      <MediaQuery
        query={moreThanMedium(theme).replace('@media ', '')}
        className={classes.logo}
        styles={{ display: 'block' }}
      >
        <Image
          src="/logo/logo-vertical-large.webp"
          alt="Karlan Tools Logo"
          width={200}
          height={100}
          priority
        />
      </MediaQuery>
      <MediaQuery
        query={`not ${moreThanMedium(theme).replace('@media ', '')}`}
        className={classes.logo}
        styles={{ display: 'block' }}
      >
        <Image
          src="/logo/logo-vertical-small.webp"
          alt="Karlan Tools Logo"
          width={150}
          height={75}
          priority
        />
      </MediaQuery>
    </Center>
  );
}
