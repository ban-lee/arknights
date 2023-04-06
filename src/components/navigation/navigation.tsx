import { Center, Collapse, createStyles, Group, Navbar, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Link, SimpleLink } from './simple-link';
import { SiteLogo } from '../site-logo';
import { useRef, useState } from 'react';

interface LinkGroup extends Link {
  links?: Link[];
  initiallyOpened?: boolean;
}

interface LinkGroupProps {
  link: LinkGroup;
}

const links: LinkGroup[] = [
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
  link: {
    cursor: 'pointer',
    minHeight: 50,
    padding: '12px 16px',
    textDecoration: 'none',
    fontSize: theme.fontSizes.md,

    '&.selected': {
      fontWeight: 'bold',
      backgroundColor: theme.colors.gray[8],
    },

    '&:hover': {
      backgroundColor: theme.colors.gray[9],
    },
  },
  subNav: {
    borderLeft: '1px solid',
    borderColor: theme.colors.gray[3],
    marginLeft: 32,
  },
}));

function LinkGroup({ link }: LinkGroupProps) {
  const { classes } = useStyles();

  const hasSubLinks = !!link.links?.length;
  const [opened, setOpened] = useState(link.initiallyOpened || false);

  const subLinks = useRef(
    <Stack
      spacing={0}
      justify="center"
      className={classes.subNav}
    >
      {(link.links ?? []).map((link, index) => (
        <SimpleLink
          key={index}
          link={link}
          isSubLink={true}
        />
      ))}
    </Stack>
  ).current;

  if (!link.url) {
    return (
      <>
        <UnstyledButton
          className={classes.link}
          onClick={() => setOpened((o) => !o)}
        >
          <Group>
            {!!link.icon && (
              <ThemeIcon p={16}>
                <i className={`bi ${link.icon}`}></i>
              </ThemeIcon>
            )}
            <Text sx={{ flex: '1 1' }}>{link.label}</Text>
            {hasSubLinks && (
              <Center sx={{ height: 24, width: 24 }}>
                <i className={`bi ${opened ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </Center>
            )}
          </Group>
        </UnstyledButton>
        {hasSubLinks ? <Collapse in={opened}>{subLinks}</Collapse> : null}
      </>
    );
  }

  return <SimpleLink link={link} />;
}

export function Navigation() {
  return (
    <Navbar
      height={'100vh'}
      width={{ sm: 300 }}
    >
      <Navbar.Section>
        <SiteLogo />
      </Navbar.Section>
      <Navbar.Section>
        <Stack
          my={8}
          spacing={0}
        >
          {links.map((link, index) => (
            <LinkGroup
              key={index}
              link={link}
            />
          ))}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
