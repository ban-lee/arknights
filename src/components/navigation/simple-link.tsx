import Link from 'next/link';
import { createStyles, CSSObject, Group, MantineTheme, Text, ThemeIcon } from '@mantine/core';
import { Link as LinkType } from '@/types/app-types';
import { useRouter } from 'next/router';

interface SimpleLinkProps {
  link: LinkType;
}

export function linkCss(theme: MantineTheme): CSSObject {
  return {
    cursor: 'pointer',
    fontWeight: 500,
    letterSpacing: 1,
    textDecoration: 'none',

    '&.selected': {
      background: '#601E06',
      fontWeight: 600,
    },

    '&:hover, &:focus': {
      background: '#601E06',
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
  },
}));

export function SimpleLink({ link }: SimpleLinkProps) {
  const router = useRouter();
  const { classes } = useStyles();

  const isSelected = router.route === link.url;

  return (
    <Link
      className={`${classes.subLink} ${isSelected ? 'selected' : ''}`}
      css={(theme) => ({ color: (theme as MantineTheme).colors.yellow[7] })}
      href={link.url!}
    >
      <Group>
        {!!link.icon && (
          <ThemeIcon
            size="sm"
            color="yellow.7"
          >
            <i className={`bi ${link.icon}`}></i>
          </ThemeIcon>
        )}
        <Text className={classes.subLinkText}>{link.label}</Text>
      </Group>
    </Link>
  );
}
