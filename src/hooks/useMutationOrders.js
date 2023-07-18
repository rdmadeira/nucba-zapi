import { useAxios } from '../contexts/AxiosContext';
import { useMutation } from '@tanstack/react-query';

const useMutationOrders = () => {
  const customAxios = useAxios();
  const { data, isLoading, mutate } = useMutation({
    mutationKey: 'orders',
    mutationFn: async (vars) => {
      const response = await customAxios.post('orders', { ...vars });

      return response;
    },
  });
  return { data, isLoading, mutate };
};

export default useMutationOrders;
