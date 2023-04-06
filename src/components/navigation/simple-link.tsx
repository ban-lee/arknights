import { Anchor, createStyles, Group, Text, ThemeIcon } from '@mantine/core';
import { useRouter } from 'next/router';

export interface Link {
  label: string;
  url?: string;
  icon?: string;
}

interface SimpleLinkProps {
  link: Link;
  isSubLink?: boolean;
}

const useStyles = createStyles((theme) => ({
  link: {
    cursor: 'pointer',
    minHeight: 50,
    padding: '12px 16px',
    textDecoration: 'none',
    fontSize: theme.fontSizes.md,

    '&.selected': {
      fontWeight: 'bold',
      backgroundColor: theme.colors.gray[8],
    },

    '&:hover': {
      backgroundColor: theme.colors.gray[9],
    },
  },
  subLink: {
    display: 'block',
    padding: 12,
    paddingLeft: 32,

    '&.selected': {
      fontWeight: 'bold',
      backgroundColor: theme.colors.gray[8],
    },

    '&:hover': {
      backgroundColor: theme.colors.gray[9],
    },
  },
}));

export function SimpleLink({ link, isSubLink }: SimpleLinkProps) {
  const router = useRouter();
  const { classes } = useStyles();

  const isSelected = router.route === link.url;

  return (
    <Anchor
      className={`${isSubLink ? classes.subLink : classes.link} ${isSelected ? 'selected' : ''}`}
      href={link.url}
    >
      <Group>
        {!!link.icon && (
          <ThemeIcon p={16}>
            <i className={`bi ${link.icon}`}></i>
          </ThemeIcon>
        )}
        <Text size={isSubLink ? 'sm' : 'md'}>{link.label}</Text>
      </Group>
    </Anchor>
  );
}
