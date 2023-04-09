import { Link } from '@/types/app-types';
import { useRouter } from 'next/router';
import {
  Anchor,
  createStyles,
  CSSObject,
  em,
  getBreakpointValue,
  Group,
  MantineTheme,
  Text,
  ThemeIcon,
} from '@mantine/core';

interface SimpleLinkProps {
  link: Link;
}

export function linkCss(theme: MantineTheme): CSSObject {
  return {
    cursor: 'pointer',
    textDecoration: 'none',

    '&.selected': {
      fontWeight: 600,
      backgroundColor: theme.colors.gray[8],
    },

    '&:hover': {
      backgroundColor: theme.colors.gray[9],
      textDecoration: 'none',
    },
  };
}

const useStyles = createStyles((theme) => ({
  subLink: {
    ...linkCss(theme),
    display: 'block',
    padding: 12,
    paddingLeft: 32,
  },
  subLinkText: {
    fontFamily: 'Montserrat, sans-serif',

    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.lg))})`]: {
      fontSize: theme.fontSizes.xs,
    },
  },
}));

export function SimpleLink({ link }: SimpleLinkProps) {
  const router = useRouter();
  const { classes } = useStyles();

  const isSelected = router.route === link.url;

  return (
    <Anchor
      className={`${classes.subLink} ${isSelected ? 'selected' : ''}`}
      href={link.url}
    >
      <Group>
        {!!link.icon && (
          <ThemeIcon size="sm">
            <i className={`bi ${link.icon}`}></i>
          </ThemeIcon>
        )}
        <Text className={classes.subLinkText}>{link.label}</Text>
      </Group>
    </Anchor>
  );
}
