
import axios from 'axios'; 
export const getAllPartidas = () =>{
   return axios.get('http://localhost:1234/partidas/partidas')
    .then(response =>{
      console.log(response);
     const {data} = response;
      return data;
    })
}