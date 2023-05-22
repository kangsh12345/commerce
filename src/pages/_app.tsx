import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    // caching을 무제한히 유지
    defaultOptions: { queries: { staleTime: Infinity } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
