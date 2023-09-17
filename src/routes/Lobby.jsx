import { useAuth } from "../auth/AuthProvider";
import PortalLayout from "../layout/PortalLayout";


import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { LiMensaje, UlMensajes } from '../ui-components';

//const socket = io('http://localhost:1234');
//const socket = io('http://localhost:1234/lobby');
let socket = null;

export default function Lobby(){
    const auth = useAuth();
    
    const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  
  //en el use efect pongo los socket on
  useEffect(() => {
    socket = io('http://localhost:1234/lobby');
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMensajes(mensajes => [...mensajes, data]);
    });
    console.log("lobby");
    return () => {
      socket.off('connect');
      socket.off('chat_message');
      socket.disconnect();
    }

  }, []);

  const enviarMensaje = () => {
    socket.emit('chat_message', {
      usuario: auth.getUser().nickname,
      mensaje: nuevoMensaje
    });
  }
    return(
    <PortalLayout>   
        <h1>Lobby: Bienvenido {auth.getUser().nickname}</h1>
        <h2>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2>
      <UlMensajes>
        {mensajes.map(mensaje => (
          <LiMensaje>{mensaje.usuario}: {mensaje.mensaje}</LiMensaje>
        ))}
      </UlMensajes>
      <input
        type="text"
        onChange={e => setNuevoMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje}>Enviar</button>


    </PortalLayout>  
    ); 
}