import { useQuery } from 'react-query';

import { appClient } from '../services/client';

async function getItem(id) {
  const data = await appClient.get(`/product/${id}`);
  return data;
}

export default function useGetItem(id) {
  return useQuery({
    queryKey: `product-${id}`,
    queryFn: async () => {
      const { data } = await getItem(id);
      return data;
    }
  });
}
