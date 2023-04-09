import { Group } from '@mantine/core';
import { SiteLogo } from './site-logo';

export function SiteLogoHorizontal() {
  return (
    <Group spacing={8}>
      <SiteLogo size={'md'} />
    </Group>
  );
}
