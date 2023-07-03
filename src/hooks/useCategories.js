import { useAxios } from '../contexts/AxiosContext';
import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
  const customAxios = useAxios();

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await customAxios('categories'); // endpoint sumado a la base_url preconfigurara en el Context

      return data;
    },
  });

  return categories;
};

export default useCategories;
