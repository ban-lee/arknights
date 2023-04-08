import { Center, Collapse, createStyles, Group, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { GroupLink } from '@/types/app-types';
import { linkCss, SimpleLink } from './simple-link';
import { useState } from 'react';

interface LinkGroupProps {
  link: GroupLink;
}

const useStyles = createStyles((theme) => ({
  groupLink: {
    ...linkCss(theme),
    padding: '12px 16px',
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
        <Group>
          {!!link.icon && (
            <ThemeIcon p={16}>
              <i className={`bi ${link.icon}`}></i>
            </ThemeIcon>
          )}
          <Text
            sx={{
              flex: '1 1',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {link.label}
          </Text>
          {hasSubLinks && (
            <Center sx={{ height: 24, width: 24 }}>
              <i className={`bi ${opened ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
            </Center>
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
