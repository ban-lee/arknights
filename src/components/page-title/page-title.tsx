import { Title } from '@mantine/core';

export function PageTitle({ title }: { title: string }) {
  return (
    <Title
      order={1}
      sx={{
        textAlign: 'center',
        marginBlock: '1.5em 0.75em',
      }}
    >
      {title}
    </Title>
  );
}
