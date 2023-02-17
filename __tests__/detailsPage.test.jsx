import { render, screen } from '@testing-library/react';

import { singleMockedItem } from './__fixtures__/mockData';
import { dataWrapper } from './__fixtures__/wrappers';

import useGetItem from '../src/api/useGetItem';
import { DetailsPage } from '../src/components/detailPage/detailsPage.jsx';
import { ItemInCartProvider } from '../src/context/itemsInCartContext.jsx';

const mockUseGetItem = useGetItem;
jest.mock('../src/api/useGetItem.js');

describe('test detailsPage component', () => {
  it('renders the loading indicator', () => {
    mockUseGetItem.mockImplementation(() => ({
      isLoading: true
    }));
    render(<DetailsPage />, { wrapper: dataWrapper });
    expect(screen.getByTestId('spinner-loading')).toBeInTheDocument();
  });
  it('render the details of a single item', () => {
    mockUseGetItem.mockImplementation(() => ({
      data: singleMockedItem,
      isSuccess: true
    }));
    const component = render(
      <ItemInCartProvider>
        <DetailsPage />
      </ItemInCartProvider>,
      { wrapper: dataWrapper }
    );
    expect(component).toMatchSnapshot();
    expect(screen.getByTestId('grid-phone-image')).toBeInTheDocument();
    expect(screen.getByTestId('grid-selector')).toBeInTheDocument();
    expect(screen.getByTestId('grid-details')).toBeInTheDocument();
  });
  it('render a error screen when the query failed', () => {
    mockUseGetItem.mockImplementation(() => ({
      isError: true,
      error: {
        message: 'test-error-message'
      }
    }));
    render(<DetailsPage />, { wrapper: dataWrapper });
    expect(screen.getByRole('axios-error')).toBeInTheDocument();
  });
});
