// Con el uso de Redux no hace falta este hook, se usa la orden del store Global

import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../contexts/AxiosContext';

const useOrderItems = (orderId) => {
  const customAxios = new useAxios();

  const orders = useQuery({
    queryKey: ['orderItems', orderId],
    queryFn: async () => {
      const { data } = await customAxios(`orders/order/${orderId}/orderItems`);

      return data;
    },
  });

  return orders;
};

export default useOrderItems;
