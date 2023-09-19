
import axios from 'axios'; 

export const getTopGanadores = () =>{
   return axios.get('http://localhost:1234/partidas/ganadores')
    .then(response =>{
      console.log(response);
     const {data} = response;
      return data;
    })
}