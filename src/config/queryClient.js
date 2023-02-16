import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * (60 * 1000),
      cacheTime: 60 * (60 * 1000),
      refetchOnMount: false,
      refetchOnWindowFocus: false
    },
    mutations: {
      staleTime: 60 * (60 * 1000),
      cacheTime: 60 * (60 * 1000),
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
});
