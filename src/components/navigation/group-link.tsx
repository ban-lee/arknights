import Link from 'next/link';
import { createStyles, Group, MantineTheme, Stack, Text, ThemeIcon } from '@mantine/core';
import { GroupLink } from '@/types/app-types';
import { linkCss, SimpleLink } from './simple-link';
import { useRouter } from 'next/router';

interface LinkGroupProps {
  link: GroupLink;
}

const useStyles = createStyles((theme) => ({
  groupHeader: {
    cursor: 'default',
    padding: '12px 16px',
  },
  groupLink: {
    ...linkCss(theme),
    padding: '12px 16px',
  },
  text: {
    flex: '1 1',
    fontFamily: 'Montserrat, sans-serif',
  },
  subNav: {
    borderLeft: '1px solid',
    borderColor: theme.colors.gray[3],
    marginLeft: 32,
  },
}));

export function GroupLink({ link }: LinkGroupProps) {
  const router = useRouter();
  const { classes } = useStyles();

  const hasSubLinks = !!link.links?.length;

  function getInternal() {
    return (
      <Group noWrap>
        {!!link.icon && (
          <ThemeIcon p={16}>
            <i className={`bi ${link.icon}`}></i>
          </ThemeIcon>
        )}
        <Text className={classes.text}>{link.label}</Text>
      </Group>
    );
  }

  function getGroupHeader() {
    return <div className={classes.groupHeader}>{getInternal()}</div>;
  }

  function getGroupLink() {
    const isSelected = router.route === link.url;

    return (
      <Link
        className={`${classes.groupLink} ${isSelected ? 'selected' : ''}`}
        css={(theme) => ({ color: (theme as MantineTheme).colors.blue[4] })}
        href={link.url!}
      >
        {getInternal()}
      </Link>
    );
  }

  return (
    <>
      {hasSubLinks ? getGroupHeader() : getGroupLink()}
      {hasSubLinks && (
        <Stack
          spacing={0}
          justify="center"
          className={classes.subNav}
        >
          {(link.links ?? []).map((link, index) => (
            <SimpleLink
              key={index}
              link={link}
            />
          ))}
        </Stack>
      )}
    </>
  );
}
