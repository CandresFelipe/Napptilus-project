import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  singleMockedItem,
  singleMockedItemWithOneSelection
} from './__fixtures__/mockData';
import { dataWrapper, mockAxios } from './__fixtures__/wrappers';

import { SelectorComponent } from '../src/components/detailPage/selectorComponent.jsx';
import { ItemInCartProvider } from '../src/context/itemsInCartContext.jsx';

afterEach(() => {
  mockAxios.reset();
});

describe('selectorComponent test', () => {
  describe('when data only has one color and storage value', () => {
    it('checks the checkboxs are checked', () => {
      render(
        <ItemInCartProvider>
          <SelectorComponent data={singleMockedItemWithOneSelection} />
        </ItemInCartProvider>,
        { wrapper: dataWrapper }
      );
      screen.getAllByTestId('color-checkbox').forEach((node) => {
        expect(node.querySelector('input[type="checkbox"]')).toHaveProperty(
          'checked',
          true
        );
      });
      screen.getAllByTestId('storage-checkbox').forEach((node) => {
        expect(node.querySelector('input[type="checkbox"]')).toHaveProperty(
          'checked',
          true
        );
      });
    });
    it('check the button is active', () => {
      render(
        <ItemInCartProvider>
          <SelectorComponent data={singleMockedItemWithOneSelection} />
        </ItemInCartProvider>,
        { wrapper: dataWrapper }
      );
      expect(screen.getByRole('custom-button')).toHaveProperty(
        'disabled',
        false
      );
    });
  });
  describe('when data has several options', () => {
    it('checks all the checkbox are unchecked', () => {
      render(
        <ItemInCartProvider>
          <SelectorComponent data={singleMockedItem} />
        </ItemInCartProvider>,
        { wrapper: dataWrapper }
      );
      screen.getAllByTestId('color-checkbox').forEach((node) => {
        expect(node.querySelector('input[type="checkbox"]')).toHaveProperty(
          'checked',
          false
        );
      });
      screen.getAllByTestId('storage-checkbox').forEach((node) => {
        expect(node.querySelector('input[type="checkbox"]')).toHaveProperty(
          'checked',
          false
        );
      });
    });
    it('checks the button is disable when a single options is checked', async () => {
      render(
        <ItemInCartProvider>
          <SelectorComponent data={singleMockedItem} />
        </ItemInCartProvider>,
        { wrapper: dataWrapper }
      );
      const checkbox = screen
        .getAllByTestId('color-checkbox')[0]
        .querySelector('input[type="checkbox"]');
      await userEvent.click(checkbox);

      expect(screen.getByRole('custom-button')).toHaveProperty(
        'disabled',
        true
      );
    });
    it('checks button is disable when no options are selected', () => {
      render(
        <ItemInCartProvider>
          <SelectorComponent data={singleMockedItem} />
        </ItemInCartProvider>,
        { wrapper: dataWrapper }
      );
      expect(screen.getByRole('custom-button')).toHaveProperty(
        'disabled',
        true
      );
    });
    it('checks button is active when both options are selected', async () => {
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
      expect(screen.getByRole('custom-button')).toHaveProperty(
        'disabled',
        false
      );
    });
    it('checks the submit button was pressed', async () => {
      mockAxios.onPost('/cart').reply(200, {});
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

      expect(await screen.findByTestId('modal')).toBeInTheDocument();
    });
  });
});
