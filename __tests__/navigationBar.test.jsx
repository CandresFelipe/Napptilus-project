import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import {
    mockDataItems,
    mockUseLocationValue,
    mockUseLocationValueWhenDetailsLanded
} from './__fixtures__/mockData';
import { dataWrapper } from './__fixtures__/wrappers.js';

import { useGetAllItems } from '../src/api/useGetAllItems.js';
import { HomePage } from '../src/components/homePage/homePage.jsx';
import { NavigationBar } from '../src/components/navigationBar';
import { ItemInCartProvider } from '../src/context/itemsInCartContext.jsx';

const queryClient = new QueryClient();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    useLocation: jest
        .fn()
        .mockImplementation(() => {
            return mockUseLocationValueWhenDetailsLanded;
        })
        .mockImplementationOnce(() => {
            return mockUseLocationValueWhenDetailsLanded;
        })
        .mockImplementationOnce(() => {
            return mockUseLocationValue;
        })
}));

const mockedUseGetAllItems = useGetAllItems;
jest.mock('../src/api/useGetAllItems.js');

const wrapper = ({ children }) => (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ItemInCartProvider>{children}</ItemInCartProvider>
        </QueryClientProvider>
    </BrowserRouter>
);

describe('Check navigationBar component renders correctly', () => {
    it('renders navigationBar', () => {
        const component = render(<NavigationBar />, { wrapper });
        expect(component).toMatchSnapshot();
    });
    describe('Check breadcrumbs lands correctly', () => {
        it('renders only the home link when is homePage', () => {
            render(<NavigationBar />, { wrapper });
            expect(screen.getByTestId('home-link-text')).toHaveTextContent(
                'Inicio'
            );
            expect(screen.queryByTestId('product-details-link')).toBeNull();
        });

        it('renders both, home and details breadcrumbs', () => {
            mockedUseGetAllItems.mockImplementation(() => ({
                data: mockDataItems,
                isSuccess: true
            }));
            render(<HomePage />, { wrapper: dataWrapper });
            screen.getAllByTestId('button-details')[0].onclick();
            render(<NavigationBar />, { wrapper });
            expect(screen.getByTestId('home-link')).toHaveTextContent('Inicio');
            expect(
                screen.getByTestId('product-details-link')
            ).toHaveTextContent('Detalles del Producto');
        });
    });
});
