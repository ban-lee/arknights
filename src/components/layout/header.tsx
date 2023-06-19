import { Burger, createStyles, Group, Header as MantineHeader, Navbar } from '@mantine/core';
import { Navigation } from '@/components/navigation';
import { SiteLogoHorizontal } from '@/components/site-logo';
import { smallOrMore } from '@/utils/media-query';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    [`@media ${smallOrMore(theme)}`]: {
      display: 'none',
    },
  },
  headerGroup: {
    background: '#872A08',
    height: '100%',
    paddingLeft: 8,
    paddingRight: 16,
    position: 'relative',
    zIndex: 1000,
  },
  menu: {
    background: '#872A08',
    bottom: '100%',
    left: 0,
    right: 0,
    top: 0,
    position: 'fixed',
    transform: 'translateY(-100%)',
    transition: 'transform 250ms',
    zIndex: 999,
  },

  open: {
    top: 80,
    transform: 'translateY(0)',
  },
}));

export function Header() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MantineHeader
        height={80}
        className={classes.header}
        withBorder={false}
      >
        <Group
          className={classes.headerGroup}
          spacing={8}
          position="apart"
          noWrap
        >
          <SiteLogoHorizontal />
          <Burger
            size="sm"
            opened={opened}
            onClick={() => setOpened((opened) => !opened)}
          />
        </Group>
        <Navbar className={`${classes.menu} ${opened ? classes.open : ''}`}>
          <Navbar.Section>
            <Navigation />
          </Navbar.Section>
        </Navbar>
      </MantineHeader>
    </>
  );
}
