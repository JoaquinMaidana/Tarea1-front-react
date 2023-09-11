import axios from 'axios'; 
export const infoUsuario = ({ token }) => {
  console.log('Token:', token); // Verifica si el token tiene el valor esperado

  const headers = {
    'x-access-token': token
  };

  return axios
    .get('http://localhost:1234/api/auth/me', { headers })
    .then(response => {
      console.log(response);
      const { data } = response;
      return data;
    });
}