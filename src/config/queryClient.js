import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchInterval: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      refetchOnMount: false
    }
  }
});
