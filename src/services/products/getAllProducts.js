
import axios from 'axios'; 
export const getAllProducts = () =>{
   return axios.get('http://localhost:1234/products/listado')
    .then(response =>{
      console.log(response);
     const {data} = response;
      return data;
    })
}