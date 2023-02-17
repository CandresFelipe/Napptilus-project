import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockDataMutation,
  mockDataMutationResponse,
  singleMockedItem
} from './__fixtures__/mockData';
import { dataWrapper, mockAxios } from './__fixtures__/wrappers';

import { postItemToCart } from '../src/api/postItemToCart';
import { SelectorComponent } from '../src/components/detailPage/selectorComponent.jsx';
import {
  ItemInCartProvider,
  useItemInCartContext
} from '../src/context/itemsInCartContext.jsx';

const TEST_KEY = 'test-cartItems';

const wrapper = ({ children }) => (
  <ItemInCartProvider>{children}</ItemInCartProvider>
);

describe('useItemsInCartContext', () => {
  it('should set localStorage with default value', () => {
    localStorage.removeItem(TEST_KEY);
    renderHook(() => useItemInCartContext(), { wrapper });
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toBeNull();
  });
});

describe('integration test useItemsInCartContext', () => {
  it('should set the localStorage with 1 item', async () => {
    localStorage.clear();
    mockAxios.onPost('/cart').reply(200, mockDataMutationResponse);
    await postItemToCart(mockDataMutation);

    renderHook(() => useItemInCartContext(), { wrapper });
    render(
      <ItemInCartProvider>
        <SelectorComponent data={singleMockedItem} />
      </ItemInCartProvider>,
      { wrapper: dataWrapper }
    );
    const colorCheckbox = screen
      .getAllByTestId('color-checkbox')[0]
      .querySelector('input[type="checkbox"]');
    const storageCheckbox = screen
      .getAllByTestId('storage-checkbox')[0]
      .querySelector('input[type="checkbox"]');
    await userEvent.click(colorCheckbox);
    await userEvent.click(storageCheckbox);
    await userEvent.click(screen.getByRole('custom-button'));
    expect(JSON.parse(localStorage.getItem('cartItems'))).toEqual(1);
  });
});
