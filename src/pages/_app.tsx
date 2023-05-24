import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    // <GoogleOAuthProvider
    //   clientId={String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}
    // >
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
    // </GoogleOAuthProvider>
  );
}
