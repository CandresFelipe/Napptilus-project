import { useQuery } from 'react-query';

import { appClient } from '../services/client';

export async function getItem(id) {
  const data = await appClient.get(`/product/${id}`);
  return data;
}

export function useGetItem(id) {
  return useQuery({
    queryKey: `product-${id}`,
    queryFn: async () => {
      const { data } = await getItem(id);
      return data;
    }
  });
}
