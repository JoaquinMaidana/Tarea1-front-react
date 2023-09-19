import axios from 'axios'; 
import { api_base } from '../../config/config.js';
export const createUsuario = ({nickname,email,password}) =>{
   return axios
    .post(api_base+'api/auth/register',{nickname,email,password})
    .then(response =>{
      console.log(response);
      const {data} = response;
      return data;
    });
}