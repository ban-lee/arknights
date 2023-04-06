import Head from 'next/head';
import { Box, ScrollArea } from '@mantine/core';
import { Navigation } from '@/components/navigation';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Upcoming Arknight events information."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main
        css={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Box sx={{ flex: '0 0 auto' }}>
          <Navigation />
        </Box>
        <ScrollArea
          sx={{
            flex: '1 1 auto',
            height: '100vh',
          }}
        >
          {children}
        </ScrollArea>
      </main>
    </>
  );
}
