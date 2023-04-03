import { Center, Text } from '@mantine/core';

export function ImageNotFound() {
  return (
    <Center
      sx={{
        height: 120,
      }}
    >
      <Text
        size="xs"
        align="center"
        color="dark"
        p={4}
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[4],
          opacity: 0.9,
        })}
      >
        Image not available
      </Text>
    </Center>
  );
}
