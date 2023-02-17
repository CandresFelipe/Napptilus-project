import { render, screen } from '@testing-library/react';

import { mockDatItems } from './__fixtures__/mockData.js';
import { dataWrapper } from './__fixtures__/wrappers.js';

import useGetAllItems from '../src/api/useGetAllItems.js';
import { HomePage } from '../src/components/homePage';

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
      render(<HomePage />, { wrapper: dataWrapper });
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });
    it('displays the loading spinner', () => {
      mockedUseGetAllItems.mockImplementation(() => ({
        isLoading: true
      }));
      render(<HomePage />, { wrapper: dataWrapper });
      expect(screen.getByTestId('spinner-loading')).toBeInTheDocument();
    });
    it('displays the list of items', () => {
      mockedUseGetAllItems.mockImplementation(() => ({
        data: mockDatItems,
        isSuccess: true
      }));
      render(<HomePage />, { wrapper: dataWrapper });
      expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    });
    it('display the error screen when query fails', () => {
      mockedUseGetAllItems.mockImplementation(() => ({
        data: mockDatItems,
        isError: true,
        error: {
          message: 'axios-error-message'
        }
      }));
      render(<HomePage />, { wrapper: dataWrapper });
      expect(screen.getByRole('axios-error')).toBeInTheDocument();
    });
  });
});
