import { MantineProvider } from '@mantine/core';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Noto Sans, sans-serif',
        headings: {
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 800,
        },
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
