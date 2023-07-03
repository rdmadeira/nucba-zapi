import { useAxios } from '../contexts/AxiosContext';
import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
  const customAxios = useAxios();

  const products = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await customAxios('products'); // endpoint sumado a la base_url preconfigurara en el Context

      return data;
    },
  });

  return products;
};

export default useProducts;
