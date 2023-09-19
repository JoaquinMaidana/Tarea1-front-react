import axios from 'axios'; 
import { api_base } from '../../config/config.js';
export const loginUsuario = ({email,password}) =>{
   return axios
    .post(api_base+'api/auth/login',{email,password})
    .then(response =>{
      console.log(response);
      const {data} = response;
      return data;
    });
}