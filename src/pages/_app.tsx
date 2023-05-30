import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from '~/components/Header/Header';

import '~/styles/globals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    // caching을 무제한히 유지
    defaultOptions: { queries: { staleTime: Infinity } },
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className="px-36 ">
          <Header />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
