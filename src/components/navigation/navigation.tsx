import { Center, Collapse, createStyles, Group, Navbar, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Link, linkCss, SubLinks } from './simple-link';
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
  groupLink: {
    ...linkCss(theme),
    padding: '12px 16px',
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

  return (
    <>
      <UnstyledButton
        className={classes.groupLink}
        sx={(theme) => ({ color: !!link.url ? theme.colors.blue[4] : undefined })}
        onClick={() => setOpened((o) => !o)}
      >
        <Group>
          {!!link.icon && (
            <ThemeIcon p={16}>
              <i className={`bi ${link.icon}`}></i>
            </ThemeIcon>
          )}
          <Text
            size="lg"
            sx={{
              flex: '1 1',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {link.label}
          </Text>
          {hasSubLinks && (
            <Center sx={{ height: 24, width: 24 }}>
              <i className={`bi ${opened ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
            </Center>
          )}
        </Group>
      </UnstyledButton>
      {hasSubLinks && (
        <Collapse in={opened}>
          <Stack
            spacing={0}
            justify="center"
            className={classes.subNav}
          >
            {(link.links ?? []).map((link, index) => (
              <SubLinks
                key={index}
                link={link}
              />
            ))}
          </Stack>
        </Collapse>
      )}
    </>
  );
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
