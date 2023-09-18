import axios from 'axios';

export const get10Partidas = (orden, limite) => {
  const params = {};

  // Verifica si se proporcionó el parámetro "orden"
  if (orden) {
    params.orden = orden;
  }

  // Verifica si se proporcionó el parámetro "limite"
  if (limite) {
    params.limite = limite;
  }

  return axios.get('http://localhost:1234/partidas/partidas', { params })
    .then(response => {
      console.log(response);
      const { data } = response;
      return data;
    })
    .catch(error => {
      console.error(error);
      throw error; // Puedes manejar el error según tus necesidades
    });
};







