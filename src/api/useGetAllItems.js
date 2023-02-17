import { useQuery } from 'react-query';

import { appClient } from '../services/client';

export async function getAllItems() {
  const data = await appClient.get('/product');
  return data;
}

export function useGetAllItems() {
  return useQuery({
    queryKey: 'products',
    queryFn: async () => {
      const { data } = await getAllItems();
      return data;
    }
  });
}
