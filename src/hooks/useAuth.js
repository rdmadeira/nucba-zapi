import { useAxios } from '../contexts/AxiosContext';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const customAxios = useAxios();
  const currentUserId = JSON.parse(localStorage.getItem('authData'))?.id || 0;

  const user = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const { data } = await customAxios(`auth/${currentUserId}`);

      return data;
    },
    staleTime: Infinity,
    cacheTime: Infinity,

    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return user;
};
