import { Box, createStyles, CSSObject } from '@mantine/core';
import { Header } from './header';
import { lessThanSmall, smallOrMore } from '@/utils/media-query';
import { Sidebar } from './sidebar';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  centerMain?: boolean;
  title: string;
}

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',

    [`@media ${lessThanSmall(theme)}`]: {
      flexDirection: 'column',
    },
    [`@media ${smallOrMore(theme)}`]: {
      flexDirection: 'row',
    },
  },
}));

export function Layout({ children, centerMain, title }: LayoutProps) {
  const { classes } = useStyles();
  const mainStyles: CSSObject = centerMain ? { marginInline: 'auto', maxWidth: 780 } : {};

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <div className={classes.container}>
        <Header />
        <Sidebar />
        <main css={{ flex: '1 1 auto' }}>
          <Box sx={mainStyles}>{children}</Box>
        </main>
      </div>
    </>
  );
}
