import { act, render, screen, waitFor } from '@testing-library/react';
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
        it('checks the checkboxs are checked', async () => {
            act(() => {
                render(
                    <ItemInCartProvider>
                        <SelectorComponent
                            options={singleMockedItemWithOneSelection.options}
                        />
                    </ItemInCartProvider>,
                    { wrapper: dataWrapper }
                );
            });
            await waitFor(() =>
                screen.getAllByTestId('color-checkbox').forEach((node) => {
                    expect(
                        node.querySelector('input[type="checkbox"]')
                    ).toHaveProperty('checked', true);
                })
            );
            await waitFor(() =>
                screen.getAllByTestId('storage-checkbox').forEach((node) => {
                    expect(
                        node.querySelector('input[type="checkbox"]')
                    ).toHaveProperty('checked', true);
                })
            );
        });
        it('check the button is active', async () => {
            act(() => {
                render(
                    <ItemInCartProvider>
                        <SelectorComponent
                            options={singleMockedItemWithOneSelection.options}
                        />
                    </ItemInCartProvider>,
                    { wrapper: dataWrapper }
                );
            });
            await waitFor(() =>
                expect(screen.getByRole('custom-button')).toHaveProperty(
                    'disabled',
                    false
                )
            );
        });
    });
    describe('when data has several options', () => {
        it('checks all the checkbox are unchecked', async () => {
            act(() => {
                render(
                    <ItemInCartProvider>
                        <SelectorComponent options={singleMockedItem.options} />
                    </ItemInCartProvider>,
                    { wrapper: dataWrapper }
                );
            });

            await waitFor(() =>
                screen.getAllByTestId('color-checkbox').forEach((node) => {
                    expect(
                        node.querySelector('input[type="checkbox"]')
                    ).toHaveProperty('checked', false);
                })
            );
            await waitFor(() =>
                screen.getAllByTestId('storage-checkbox').forEach((node) => {
                    expect(
                        node.querySelector('input[type="checkbox"]')
                    ).toHaveProperty('checked', false);
                })
            );
        });
        it('checks the button is disable when a single options is checked', async () => {
            act(() => {
                render(
                    <ItemInCartProvider>
                        <SelectorComponent options={singleMockedItem.options} />
                    </ItemInCartProvider>,
                    { wrapper: dataWrapper }
                );
            });

            await waitFor(() => {
                const checkbox = screen
                    .getAllByTestId('color-checkbox')[0]
                    .querySelector('input[type="checkbox"]');
                userEvent.click(checkbox);
            });

            await waitFor(() =>
                expect(screen.getByRole('custom-button')).toHaveProperty(
                    'disabled',
                    true
                )
            );
        });
        it('checks button is disable when no options are selected', async () => {
            act(() => {
                render(
                    <ItemInCartProvider>
                        <SelectorComponent options={singleMockedItem.options} />
                    </ItemInCartProvider>,
                    { wrapper: dataWrapper }
                );
            });
            await waitFor(() =>
                expect(screen.getByRole('custom-button')).toHaveProperty(
                    'disabled',
                    true
                )
            );
        });
        it('checks button is active when both options are selected', async () => {
            act(() => {
                render(
                    <ItemInCartProvider>
                        <SelectorComponent options={singleMockedItem.options} />
                    </ItemInCartProvider>,
                    { wrapper: dataWrapper }
                );
            });
            await waitFor(() => {
                const colorCheckbox = screen
                    .getAllByTestId('color-checkbox')[0]
                    .querySelector('input[type="checkbox"]');
                const storageCheckbox = screen
                    .getAllByTestId('storage-checkbox')[0]
                    .querySelector('input[type="checkbox"]');
                userEvent.click(colorCheckbox);
                userEvent.click(storageCheckbox);
            });
            await waitFor(() =>
                expect(screen.getByRole('custom-button')).toHaveProperty(
                    'disabled',
                    false
                )
            );
        });
        it('checks the submit button was pressed', async () => {
            const user = userEvent.setup();
            act(() => {
                render(
                    <ItemInCartProvider>
                        <SelectorComponent options={singleMockedItem.opt} />
                    </ItemInCartProvider>,
                    { wrapper: dataWrapper }
                );
            });

            await waitFor(() => {
                const colorCheckbox = screen
                    .getAllByTestId('color-checkbox')[0]
                    .querySelector('input[type="checkbox"]');
                user.click(colorCheckbox);
                const storageCheckbox = screen
                    .getAllByTestId('storage-checkbox')[0]
                    .querySelector('input[type="checkbox"]');
                user.click(storageCheckbox);
            });
            mockAxios.onPost('/cart').reply(200, {});
            await waitFor(() => user.click(screen.getByRole('custom-button')));

            await waitFor(() =>
                expect(screen.getByTestId('modal')).toBeInTheDocument()
            );
        });
    });
});
