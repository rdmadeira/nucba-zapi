import { useAxios } from '../contexts/AxiosContext';
import { useMutation } from '@tanstack/react-query';

const useMutationOrders = (orderId, config) => {
  const customAxios = useAxios();
  const { data, isLoading, mutate } = useMutation({
    mutationKey: 'orders',
    mutationFn: async (vars) => {
      if (orderId && config?.method === 'put') {
        const response = await customAxios.put(`orders/${orderId}`, {
          ...vars,
        });

        return response;
      }

      const response = await customAxios.post('orders', { ...vars });

      return response;
    },
  });
  return { data, isLoading, mutate };
};

export default useMutationOrders;
