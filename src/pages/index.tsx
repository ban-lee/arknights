import { Box, Space, Text, Title } from '@mantine/core';
import { Layout } from '@/components/layout';

export default function Home() {
  return (
    <>
      <Layout title={'Karlan Tools'}>
        <Box py={32}>
          <Title align="center">Karlan Tools</Title>
          <Space h="xl" />
          <Text align="center">Some random Arknights things that I{"'"}ve made.</Text>
        </Box>
      </Layout>
    </>
  );
}
