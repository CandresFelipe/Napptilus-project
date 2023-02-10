import { useQuery } from 'react-query';

import { appClient } from '../services/client';

async function getAllItems() {
  const data = await appClient.get('/product');
  return data;
}

export default function useGetAllItemsQuery() {
  return useQuery({
    queryKey: 'products',
    queryFn: async () => {
      const { data } = await getAllItems();
      return data;
    }
  });
}
