import axios from 'axios';
import { api_base } from '../../config/config.js';
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

  return axios.get(api_base+'partidas/partidas', { params })
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







