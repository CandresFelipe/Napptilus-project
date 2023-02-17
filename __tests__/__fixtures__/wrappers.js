import MockAdaptor from 'axios-mock-adapter';
import { QueryClient, QueryClientProvider } from 'react-query';

import { DataProvider } from '../../src/context/dataContext.jsx';
import { appClient } from '../../src/services/client.js';

export const mockAxios = new MockAdaptor(appClient);

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
