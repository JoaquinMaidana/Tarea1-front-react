import axios from 'axios'; 
import { api_base } from '../../config/config.js';
export const infoUsuario = ({ token }) => {
  console.log('Token:', token); // Verifica si el token tiene el valor esperado

  const headers = {
    'x-access-token': token
  };

  return axios
    .get(api_base+'api/auth/me', { headers })
    .then(response => {
      console.log(response);
      const { data } = response;
      return data;
    });
}