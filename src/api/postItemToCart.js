import { useMutation } from 'react-query';

import { appClient } from '../services/client';

export function postItemToCart(data) {
    const res = appClient.post('/cart', data);
    return res;
}

export function usePostItemToCartQuery() {
    return useMutation({
        mutationKey: 'cart',
        mutationFn: async (data) => {
            return await postItemToCart(data);
        }
    });
}
