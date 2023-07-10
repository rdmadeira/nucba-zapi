import { useAxios } from '../contexts/AxiosContext';
import { useQuery } from '@tanstack/react-query';

const useProducts = (productId) => {
  const customAxios = useAxios();

  const products = useQuery({
    queryKey: productId ? ['product', productId] : ['products'],
    queryFn: async () => {
      if (productId) {
        const { data } = await customAxios(`products/${productId}`);
        return data;
      }
      const { data } = await customAxios('products'); // endpoint sumado a la base_url preconfigurara en el Context

      return data;
    },
  });

  return products;
};

export default useProducts;
