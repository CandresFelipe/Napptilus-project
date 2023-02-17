import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import useGetAllItems from '../src/api/useGetAllItems.js';
import { HomePage } from '../src/components/homePage';
import { DataProvider } from '../src/context/dataContext.jsx';

const mockData = [
  {
    id: 'id-test-1',
    brand: 'Acer-test-1',
    model: 'Liquid Z6-test-1',
    price: '120-t',
    imgUrl: 'test.png'
  },
  {
    id: 'id-test-2',
    brand: 'Acer-test-2',
    model: 'Iconia Tab 10 A3-A40-test-2',
    price: '230-t',
    imgUrl: 'test.jpg'
  }
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

function wrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>{children}</DataProvider>
    </QueryClientProvider>
  );
}

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

const mockedUseGetAllItems = useGetAllItems;
jest.mock('../src/api/useGetAllItems.js');

describe('HomePage component', () => {
  describe('Stages of HomePage rendering', () => {
    it('renders the Search component', () => {
      mockedUseGetAllItems.mockImplementation(() => ({
        isSuccess: true
      }));
      render(<HomePage />, { wrapper });
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });
    it('displays the loading spinner', () => {
      mockedUseGetAllItems.mockImplementation(() => ({
        isLoading: true
      }));
      render(<HomePage />, { wrapper });
      expect(screen.getByTestId('spinner-loading')).toBeInTheDocument();
    });
    it('displays the list of items', () => {
      mockedUseGetAllItems.mockImplementation(() => ({
        data: mockData,
        isSuccess: true
      }));
      render(<HomePage />, { wrapper });
      expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    });
    it('display the error screen when query fails', () => {
      mockedUseGetAllItems.mockImplementation(() => ({
        data: mockData,
        isError: true,
        error: {
          message: 'axios-error-message'
        }
      }));
      render(<HomePage />, { wrapper });
      expect(screen.getByRole('axios-error')).toBeInTheDocument();
    });
  });
});
