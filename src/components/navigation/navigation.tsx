import { Burger, createStyles, Group, Header, Navbar, Stack, useMantineTheme } from '@mantine/core';
import { GroupLink as GroupLinkComponent } from './group-link';
import { GroupLink } from '@/types/app-types';
import { lessThanSmall } from '@/utils/media-query';
import { SiteLogoHorizontal, SiteLogoVertical } from '../site-logo';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

const links: GroupLink[] = [
  { label: 'Home', url: '/', icon: 'bi-house-fill', links: [] },
  {
    label: 'Upcoming',
    icon: 'bi-calendar-fill',
    initiallyOpened: true,
    links: [
      { label: 'Events', url: '/upcoming-events' },
      { label: 'Farming Materials', url: '/upcoming-materials' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  headerGroup: {
    height: '100%',
    paddingLeft: 8,
    paddingRight: 16,
  },
  navbar: {
    [lessThanSmall(theme)]: {
      position: 'absolute',
    },
  },
  navbarSection: {
    backgroundColor: theme.colors.dark[7],
  },
}));

export function Navigation() {
  const theme = useMantineTheme();
  const isXSmall = useMediaQuery(lessThanSmall(theme).replace('@media ', ''));
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <>
      {isXSmall && (
        <Header height={100}>
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
        </Header>
      )}
      {
        <Navbar
          className={classes.navbar}
          width={{ sm: 200, md: 200, lg: 300 }}
          hidden={isXSmall && !opened}
        >
          {!isXSmall && (
            <Navbar.Section>
              <header>
                <SiteLogoVertical />
              </header>
            </Navbar.Section>
          )}
          <Navbar.Section className={classes.navbarSection}>
            <Stack spacing={0}>
              {links.map((link, index) => (
                <GroupLinkComponent
                  key={index}
                  link={link}
                />
              ))}
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
    </>
  );
}
