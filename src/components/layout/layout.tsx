import Head from 'next/head';
import { createStyles, ScrollArea } from '@mantine/core';
import { Header } from './header';
import { lessThanSmall, smallOrMore } from '@/utils/media-query';
import { Sidebar } from './sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',

    [`@media ${lessThanSmall(theme)}`]: {
      flexDirection: 'column',
    },
    [`@media ${smallOrMore(theme)}`]: {
      flexDirection: 'row',
    },
  },
  navigation: {
    flex: '0 0 auto',
    position: 'sticky',
    left: 0,
    zIndex: 2000,
  },
}));

export function Layout({ children, title }: LayoutProps) {
  const { classes } = useStyles();
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
      <div className={classes.container}>
        <div className={classes.navigation}>
          <Header />
          <Sidebar />
        </div>
        <main css={{ flex: '1 1 auto' }}>
          <ScrollArea h={{ base: 'calc(100vh - 80px)', sm: '100vh' }}>{children}</ScrollArea>
        </main>
      </div>
    </>
  );
}
