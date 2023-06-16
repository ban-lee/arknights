import { createStyles, Navbar } from '@mantine/core';
import { lessThanSmall } from '@/utils/media-query';
import { Navigation } from '@/components/navigation';
import { SiteLogoVertical } from '@/components/site-logo';

const useStyles = createStyles((theme) => ({
  navbar: {
    height: '100vh',

    [`@media ${lessThanSmall(theme)}`]: {
      display: 'none',
    },
  },
}));

export function Sidebar() {
  const { classes } = useStyles();
  return (
    <>
      <Navbar
        className={classes.navbar}
        width={{ sm: 300 }}
      >
        <Navbar.Section py={16}>
          <SiteLogoVertical />
        </Navbar.Section>
        <Navbar.Section>
          <Navigation />
        </Navbar.Section>
      </Navbar>
    </>
  );
}
