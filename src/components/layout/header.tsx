import { Burger, createStyles, Group, Header as MantineHeader, Navbar } from '@mantine/core';
import { moreThanSmall } from '@/utils/media-query';
import { Navigation } from '@/components/navigation';
import { SiteLogoHorizontal } from '@/components/site-logo';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'relative',

    [moreThanSmall(theme)]: {
      display: 'none',
    },
  },
  headerGroup: {
    height: '100%',
    paddingLeft: 8,
    paddingRight: 16,
  },
  menu: {
    position: 'absolute',
  },
}));

export function Header() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MantineHeader
        height={100}
        className={classes.header}
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
        <Navbar
          className={classes.menu}
          display={opened ? 'block' : 'none'}
        >
          <Navbar.Section>
            <Navigation />
          </Navbar.Section>
        </Navbar>
      </MantineHeader>
    </>
  );
}