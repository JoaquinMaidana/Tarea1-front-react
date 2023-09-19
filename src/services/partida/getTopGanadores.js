
import axios from 'axios'; 
import { api_base } from '../../config/config.js';
export const getTopGanadores = () =>{
   return axios.get(api_base+'partidas/ganadores')
    .then(response =>{
      console.log(response);
     const {data} = response;
      return data;
    })
}