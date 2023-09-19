import axios from 'axios'; 
import { api_base } from '../../config/config.js';
export const createPartida = (idUsuarioX,idUsuarioO,ganador) =>{
   return axios
    .post(api_base+'partidas/partida',{idUsuarioX,idUsuarioO,ganador})
    .then(response =>{
      console.log(response);
      const {data} = response;
      return data;
    });
}