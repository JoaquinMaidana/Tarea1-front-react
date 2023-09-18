import { useAuth } from "../auth/AuthProvider";
import PortalLayout from "../layout/PortalLayout";

import { Link } from "react-router-dom";
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { LiMensaje, UlMensajes } from '../ui-components';
import { ItemPartida } from "../components/ItemPartida.jsx";
import { getAllPartidas } from '../services/partida/getAllPartidas.js';
import { get10Partidas } from '../services/partida/get10Partidas.js';
//const socket = io('http://localhost:1234');
//const socket = io('http://localhost:1234/lobby');
let socket = null;

export default function Lobby() {
  const auth = useAuth();

  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [itemsTodas, setItemsTodas] = useState([]);
  const [itemsUltimas10, setItemsUltimas10] = useState([]);


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


  useEffect(() => {
    console.log("useEffect");

    getAllPartidas()
      .then((partidas) => {
        setItemsTodas(partidas);
      });

  }, []);

  useEffect(() => {
    console.log("useEffect");

    get10Partidas('descendente', 10)
      .then((partidas) => {
        setItemsUltimas10(partidas);
      });

  }, []);

  const enviarMensaje = () => {
    socket.emit('chat_message', {
      usuario: auth.getUser().nickname,
      mensaje: nuevoMensaje
    });
  }
  return (
    <PortalLayout>
      <h1>Lobby: Bienvenido {auth.getUser().nickname}</h1>
      <div class="salas">
        <div>
          <Link class="linkSala" to="/juego/1">
            Sala 1
          </Link>

          <span>0/2</span>
        </div>
        <div>
          <Link class="linkSala" to="/juego/2">
            Sala 2
          </Link>

          <span>0/2</span>
        </div>
        <div>
          <Link class="linkSala" to="/juego/3">
            Sala 3
          </Link>

          <span>0/2</span>
        </div>
        <div>
          <Link class="linkSala" to="/juego/4">
            Sala 4
          </Link>

          <span>0/2</span>
        </div>
        <div>
          <Link class="linkSala" to="/juego/5">
            Sala 5
          </Link>

          <span>0/2</span>
        </div>
      </div>
      <h2>{isConnected ? 'CONECTADO🟢' : 'NO CONECTADO🔴'}</h2>
      <div class="chatContainer">

        <div class="contenedor">

          
            <div class="chat">
            <UlMensajes>
                {mensajes.map(mensaje => (
                  <LiMensaje>{mensaje.usuario}: {mensaje.mensaje}</LiMensaje>
                ))}
              </UlMensajes>
              <div class="d-flex justify-content-center">
        <div>
          <input
            type="text" class="me-2"
            onChange={e => setNuevoMensaje(e.target.value)}
          />
          <button class="btnChat" onClick={enviarMensaje}>Enviar</button>
        </div>

      </div>
            </div>
            <div class="listados ">
            <ul class="nav nav-tabs " id="myTab" role="tablist">
                <li class="nav-item " role="presentation">
                  <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Todas las partidas</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Jugadores con mas victorias</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Ultimas 10 partidas</button>
                </li>

              </ul>
              <div class="tab-content " id="myTabContent">
                <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                  <ol class="p-3">
                    {
                      itemsTodas.map((item) => {
                        return <ItemPartida  key={item._id} jugadorX={item.jugadorX.nickname} jugadorO={item.jugadorO.nickname} ganador={item.ganador.nickname} fecha={item.fecha}/>
                      })
                    }
                  </ol>
                </div>
                <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                </div>
                <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                  <ol>
                    {
                      itemsUltimas10.map((item) => {
                        return <ItemPartida  key={item._id} jugadorX={item.jugadorX.nickname} jugadorO={item.jugadorO.nickname} ganador={item.ganador.nickname} fecha={item.fecha}/>
                      })
                    }
                  </ol>
                </div>

              </div>
            </div>


           
         


        </div>




      </div>
     





    </PortalLayout>
  );
}