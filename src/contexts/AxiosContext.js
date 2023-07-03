// Se crea un context de axios para usar una basede configuración de axios en todo el app:

import { createContext, useContext, useMemo } from 'react';
import Axios from 'axios';

export const AxiosContext = createContext();

// AxiosProvider es el context provider de react que nos devuelve el objecto axios configurado:
export function AxiosProvider({ children }) {
  // Se hace el memoize del objecto axios, o sea, se crea una instancia del objecto axios sin cambiarlo, para todo el app, con useMemo:
  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL: `${process.env.REACT_APP_API_BASE_URL}/`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //INTERCEPTOR DE AXIOS: - Interceptar cada request, antes que se ejecute, se aplica una function de middleware, y si existe el authData y el token, se va agregar al headers, el Authorization con el token
    // Nos permite que a cada request, no tengamos que repetir las configuraciones, como en fetch, usamos el ContextProvider conteniendo la instancia de axios.
    axios.interceptors.request.use((config) => {
      const data = localStorage.getItem('authData') || null;
      const authData = data ? JSON.parse(data) : null;

      if (authData?.token) {
        config.headers.Authorization = `Bearer ${authData.token}`;
      }

      return config;
    });

    return axios;
  }, []);

  return (
    <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
  );
}

// La funcion useAxios nos permite usar el AxiosContext en toda la app, sin tener que aplicar un nuevo createContext en cada archivo:
export function useAxios() {
  return useContext(AxiosContext);
}
