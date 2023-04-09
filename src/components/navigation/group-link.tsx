import { Collapse, createStyles, Group, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { GroupLink } from '@/types/app-types';
import { linkCss, SimpleLink } from './simple-link';
import { mediumScreenSize } from '@/utils/media-query';
import { useState } from 'react';

interface LinkGroupProps {
  link: GroupLink;
}

const useStyles = createStyles((theme) => ({
  groupLink: {
    ...linkCss(theme),
    padding: '12px 16px',
  },
  groupLinkText: {
    flex: '1 1',
    fontFamily: 'Montserrat, sans-serif',

    [mediumScreenSize(theme)]: {
      fontSize: theme.fontSizes.sm,
    },
  },
  groupLinkChevron: {
    height: 24,
    width: 24,
    lineHeight: '24px',
  },
  subNav: {
    borderLeft: '1px solid',
    borderColor: theme.colors.gray[3],
    marginLeft: 32,
  },
}));

export function GroupLink({ link }: LinkGroupProps) {
  const { classes } = useStyles();

  const hasSubLinks = !!link.links?.length;
  const [opened, setOpened] = useState(link.initiallyOpened || false);

  return (
    <>
      <UnstyledButton
        className={classes.groupLink}
        sx={(theme) => ({ color: !!link.url ? theme.colors.blue[4] : undefined })}
        onClick={() => setOpened((o) => !o)}
      >
        <Group noWrap>
          {!!link.icon && (
            <ThemeIcon p={16}>
              <i className={`bi ${link.icon}`}></i>
            </ThemeIcon>
          )}
          <Text className={classes.groupLinkText}>{link.label}</Text>
          {hasSubLinks && (
            <div className={classes.groupLinkChevron}>
              <i className={`bi ${opened ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
            </div>
          )}
        </Group>
      </UnstyledButton>
      {hasSubLinks && (
        <Collapse in={opened}>
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
        </Collapse>
      )}
    </>
  );
}
