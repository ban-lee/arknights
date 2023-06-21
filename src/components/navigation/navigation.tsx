import { GroupLink as GroupLinkComponent } from './group-link';
import { GroupLink } from '@/types/app-types';
import { Stack } from '@mantine/core';

const links: GroupLink[] = [
  { label: 'Home', url: '/', icon: 'bi-house-fill', links: [] },
  {
    label: 'Upcoming',
    icon: 'bi-calendar-fill',
    links: [
      { label: 'Events', url: '/upcoming-events' },
      { label: 'Farming Materials', url: '/upcoming-materials' },
    ],
  },
  {
    label: 'Skins',
    icon: 'bi-person-fill',
    url: '/skins',
  },
];

export function Navigation() {
  return (
    <>
      <Stack spacing={0}>
        {links.map((link, index) => (
          <GroupLinkComponent
            key={index}
            link={link}
          />
        ))}
      </Stack>
    </>
  );
}
