import { QueryClient, QueryClientProvider } from 'react-query';

import { DataProvider } from '../../src/context/dataContext.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

export function dataWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>{children}</DataProvider>
    </QueryClientProvider>
  );
}
