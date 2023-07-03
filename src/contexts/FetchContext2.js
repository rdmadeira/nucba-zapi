/* // Este archivo sería adoptando un custom fetch agregando un INTERCEPTOR antes del request por medio de un Monkey patching, si no quiero usar Axios:

import { useContext, createContext, useMemo } from 'react';

export const FetchContext = createContext();

export function useCustomFetch() {
  return useContext(FetchContext);
}

export const FetchProvider = ({ children }) => {
  const customFetch = useMemo(() => {
    // Monkey patching with Fetch - interceptor con custom fetch:
    const { fetch: originalFetch } = window;

    window.fetch = async (...args) => {
      let [urlString, config] = args;

      const authDataString = localStorage.getItem('authData') || null;
      const authData = authDataString ? JSON.parse(authDataString) : null;

      if (config?.headers) {
        config.headers = [
          ...config.headers,
          ['Content-type', 'application/json'],
        ];
      } else {
        config = {};
        config.headers = [['Content-type', 'application/json']];
      }

      if (authData?.token) {
        config.headers.Authorization = `Bearer ${authData.token}`;
      }

      const response = await originalFetch(
        `${process.env.REACT_APP_API_BASE_URL}/${urlString}`,
        config
      );

      return response.json();
    };

    return window.fetch;
  }, []);

  return (
    <FetchContext.Provider value={customFetch}>
      {children}
    </FetchContext.Provider>
  );
};
 */
