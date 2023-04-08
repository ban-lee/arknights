import { GroupLink as GroupLinkComponent } from './group-link';
import { GroupLink } from '@/types/app-types';
import { Navbar, Stack } from '@mantine/core';
import { SiteLogo } from '../site-logo';

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
            <GroupLinkComponent
              key={index}
              link={link}
            />
          ))}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
