import { createStyles, ScrollArea } from '@mantine/core';
import { Header } from './header';
import { lessThanSmall, smallOrMore } from '@/utils/media-query';
import { Sidebar } from './sidebar';
import { useEffect } from 'react';

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

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.navigation}>
          <Header />
          <Sidebar />
        </div>
        <main css={{ flex: '1 1 auto' }}>
          <ScrollArea h={{ base: 'calc(100vh - 80px)', md: '100vh' }}>{children}</ScrollArea>
        </main>
      </div>
    </>
  );
}
