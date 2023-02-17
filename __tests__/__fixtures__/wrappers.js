import { QueryClient, QueryClientProvider } from 'react-query';

import { DataProvider } from '../../src/context/dataContext.jsx';

export function dataWrapper({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>{children}</DataProvider>
    </QueryClientProvider>
  );
}
