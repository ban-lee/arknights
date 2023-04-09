import { em, getBreakpointValue, Stack, useMantineTheme } from '@mantine/core';
import { SiteLogo } from './site-logo';
import { useMediaQuery } from '@mantine/hooks';

export function SiteLogoVertical() {
  const theme = useMantineTheme();
  const isSmall = useMediaQuery(`(max-width: ${em(getBreakpointValue(theme.breakpoints.lg))})`);

  return (
    <Stack
      align="center"
      spacing={isSmall ? 8 : 12}
      my={16}
    >
      <SiteLogo size={isSmall ? 'sm' : 'md'} />
    </Stack>
  );
}
