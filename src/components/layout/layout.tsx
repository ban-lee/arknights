import Head from 'next/head';
import { createStyles, ScrollArea } from '@mantine/core';
import { lessThanSmall, moreThanSmall } from '@/utils/media-query';
import { Navigation } from '@/components/navigation';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
  },
  narrow: {
    [lessThanSmall(theme)]: {
      flexDirection: 'column',
    },
  },
  wide: {
    [moreThanSmall(theme)]: {
      flexDirection: 'row',
    },
  },
  main: {
    width: '100%',
  },
  navigation: {
    flex: '0 0 auto',
    position: 'sticky',
    left: 0,
    zIndex: 2000,
  },
  scroll: {
    flex: '1 1 auto',

    [lessThanSmall(theme)]: {
      height: 'calc(100vh - 100px)',
    },

    [moreThanSmall(theme)]: {
      height: '100vh',
    },
  },
}));

export function Layout({ children, title }: LayoutProps) {
  const { classes, cx } = useStyles();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Upcoming Arknight events information."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <div className={cx(classes.container, classes.narrow, classes.wide)}>
        <div className={classes.navigation}>
          <Navigation />
        </div>
        <main className={classes.main}>
          <ScrollArea className={classes.scroll}>{children}</ScrollArea>
        </main>
      </div>
    </>
  );
}
