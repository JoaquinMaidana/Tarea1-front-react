import axios from 'axios'; 
export const createPartida = (idUsuarioX,idUsuarioO,ganador) =>{
   return axios
    .post('http://localhost:1234/partidas/partida',{idUsuarioX,idUsuarioO,ganador})
    .then(response =>{
      console.log(response);
      const {data} = response;
      return data;
    });
}