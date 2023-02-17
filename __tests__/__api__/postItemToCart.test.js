import { postItemToCart } from '../../src/api/postItemToCart.js';
import {
  mockDataMutation,
  mockDataMutationResponse
} from '../__fixtures__/mockData';
import { mockAxios } from '../__fixtures__/wrappers';

afterEach(() => {
  mockAxios.reset();
});

describe('when all items are requested', () => {
  it('checks the request returns a successful response', async () => {
    mockAxios.onPost('/cart').reply(202, mockDataMutationResponse);
    const { data } = await postItemToCart(mockDataMutation);
    expect(data).toEqual(mockDataMutationResponse);
  });
  it('checks the request has failed', async () => {
    mockAxios.onPost('/cart').reply(400, {
      message: 'error-test-message'
    });
    let response;
    await postItemToCart({
      id: 'test',
      colorCode: 1
    }).catch((error) => (response = error));
    expect(response.response.data).toEqual({ message: 'error-test-message' });
    expect(response.response.status).toEqual(400);
  });
});
