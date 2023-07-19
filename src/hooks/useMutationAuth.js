import { useAxios } from '../contexts/AxiosContext';
import { useMutation } from '@tanstack/react-query';

const useMutationAuth = () => {
  const customAxios = useAxios();

  const { data, isSuccess, isLoading, isError, mutate, error, reset } =
    useMutation({
      mutationKey: ['auth'],
      mutationFn: async (vars) => {
        return vars.signUp
          ? customAxios.post('auth/signup', { ...vars })
          : customAxios.post('auth/login', { ...vars });
      },
      staleTime: Infinity,
      cacheTime: Infinity,

      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });

  return { data, isSuccess, isLoading, isError, mutate, error, reset };
};

export default useMutationAuth;
