import { getItem } from '../../src/api/useGetItem';
import { singleMockedItem } from '../__fixtures__/mockData';
import { mockAxios } from '../__fixtures__/wrappers';

afterEach(() => {
  mockAxios.reset();
});

describe('when all items are requested', () => {
  const id = 'test-id';
  it('checks the request returns a successful response', async () => {
    mockAxios.onGet(`/product/${id}`).reply(200, singleMockedItem);
    const { data } = await getItem(id);
    expect(data).toEqual(singleMockedItem);
  });
  it('checks the request has failed', async () => {
    mockAxios.onGet(`/product/${id}`).reply(400, {
      message: 'error-test-message'
    });
    let response;
    await getItem(id).catch((error) => (response = error));
    expect(response.response.data).toEqual({ message: 'error-test-message' });
    expect(response.response.status).toEqual(400);
  });
});
