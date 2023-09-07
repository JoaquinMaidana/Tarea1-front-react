import axios from 'axios'; 
export const loginUsuario = ({email,password}) =>{
   return axios
    .post('http://localhost:1234/api/auth/login',{email,password})
    .then(response =>{
      console.log(response);
      const {data} = response;
      return data;
    });
}