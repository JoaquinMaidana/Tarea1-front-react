import axios from 'axios'; 
export const createUsuario = ({nickname,email,password}) =>{
   return axios
    .post('http://localhost:1234/api/auth/register',{nickname,email,password})
    .then(response =>{
      console.log(response);
      const {data} = response;
      return data;
    });
}