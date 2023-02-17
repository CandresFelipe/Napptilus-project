import { getAllItems } from '../../src/api/useGetAllItems';
import { mockDataItems } from '../__fixtures__/mockData';
import { mockAxios } from '../__fixtures__/wrappers';

afterEach(() => {
  mockAxios.reset();
});

describe('when all items are requested', () => {
  it('checks the request returns a successful response', async () => {
    mockAxios.onGet('/product').reply(200, mockDataItems);
    const { data } = await getAllItems();
    expect(data).toEqual(mockDataItems);
  });
  it('checks the request has failed', async () => {
    mockAxios.onGet('/product').reply(400, {
      message: 'error-test-message'
    });
    let response;
    await getAllItems().catch((error) => (response = error));
    expect(response.response.data).toEqual({ message: 'error-test-message' });
    expect(response.response.status).toEqual(400);
  });
});
