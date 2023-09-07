import axios from 'axios'; 

export const infoUsuario = ({ token }) => {
  const headers = {
    'x-access-token': token // 
  };

  return axios
    .post('http://localhost:1234/api/auth/me', {}, { headers })
    .then(response => {
      console.log(response);
      const { data } = response;
      return data;
    });
}