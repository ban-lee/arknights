import { Anchor, createStyles, CSSObject, Group, MantineTheme, Text, ThemeIcon } from '@mantine/core';
import { Link } from '@/types/app-types';
import { useRouter } from 'next/router';

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
          <ThemeIcon
            size="sm"
            sx={(theme) => ({
              fontSize: theme.fontSizes.xs,
              lineHeight: `${theme.fontSizes.xs}px`,
            })}
          >
            <i className={`bi ${link.icon}`}></i>
          </ThemeIcon>
        )}
        <Text
          size="sm"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          {link.label}
        </Text>
      </Group>
    </Anchor>
  );
}
