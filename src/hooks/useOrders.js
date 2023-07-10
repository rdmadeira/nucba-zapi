// Con el uso de Redux no hace falta este hook, se usa la orden del store Global

import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../contexts/AxiosContext';

const useOrders = (orderId) => {
  const customAxios = new useAxios();
  const userId = JSON.parse(localStorage.getItem('authData'))?.id || 0;

  const orders = useQuery({
    queryKey: orderId ? ['order', orderId] : ['orders'],
    queryFn: async () => {
      if (orderId) {
        const { data } = await customAxios(`orders/order/${orderId}`);

        return data;
      }
      const { data } = await customAxios(`orders/${userId}`);
      return data;
    },
  });

  return orders;
};

export default useOrders;
