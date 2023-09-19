
import axios from 'axios'; 
import { api_base } from '../../config/config.js';
export const getAllPartidas = () =>{
   return axios.get(api_base+'partidas/partidas')
    .then(response =>{
      console.log(response);
     const {data} = response;
      return data;
    })
}