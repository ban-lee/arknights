import { GroupLink as GroupLinkComponent } from './group-link';
import { GroupLink } from '@/types/app-types';
import { Navbar, Stack } from '@mantine/core';
import { SiteLogoVertical } from '../site-logo';

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
      width={{ sm: 200, md: 200, lg: 300 }}
      hiddenBreakpoint="sm"
      hidden
    >
      <Navbar.Section>
        <SiteLogoVertical />
      </Navbar.Section>
      <Navbar.Section>
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
  );
}
