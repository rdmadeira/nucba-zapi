import { useAxios } from '../contexts/AxiosContext';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const customAxios = useAxios();

  const user = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const { data } = await customAxios('auth');

      return data;
    },
  });

  return user;
};
