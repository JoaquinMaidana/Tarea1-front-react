import { useAuth } from "../auth/AuthProvider";
import PortalLayout from "../layout/PortalLayout";

import { Link } from "react-router-dom";
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { LiMensaje, UlMensajes } from '../ui-components';
import { ItemPartida } from "../components/ItemPartida.jsx";
import { ItemUsuario } from "../components/ItemUsuario.jsx";
import { getAllPartidas } from '../services/partida/getAllPartidas.js';
import { get10Partidas } from '../services/partida/get10Partidas.js';
import { getTopGanadores } from '../services/partida/getTopGanadores.js';
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
  const [topGanadores, setTopGanadores] = useState([]);
  
  const [salas, setSalas] = useState({
    1: { jugadores: 0 },
    2: { jugadores: 0 },
    3: { jugadores: 0 },
    4: { jugadores: 0 },
    5: { jugadores: 0 },
  });

  //en el use efect pongo los socket on
  useEffect(() => {
    socket = io('https://tarea1-63hu.onrender.com/lobby');
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMensajes(mensajes => [...mensajes, data]);
    });
    console.log("lobby");

    socket.on('gameConnection', (sala) => {
     console.log(sala);
      sala = parseInt(sala.sala);
      setSalas((salas) => ({
        ...salas,
        [sala]: {
          jugadores:  salas[sala].jugadores + 1 ,
        },
      }));
    });

    socket.on('gameDisconnection', (sala) => {
      console.log(sala);
       sala = parseInt(sala.sala);
       setSalas((salas) => ({
         ...salas,
         [sala]: {
           jugadores:  salas[sala].jugadores > 0 ? salas[sala].jugadores - 1 : 0,
         },
       }));
     });

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

  useEffect(() => {
    console.log("useEffect");

    getTopGanadores()
      .then((usuarios) => {
        setTopGanadores(usuarios);
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

          <span>{salas[1].jugadores}/2</span>
        </div>
        <div>
          <Link class="linkSala" to="/juego/2">
            Sala 2
          </Link>

          <span>{salas[2].jugadores}/2</span>
        </div>
        <div>
          <Link class="linkSala" to="/juego/3">
            Sala 3
          </Link>

          <span>{salas[3].jugadores}/2</span>
        </div>
        <div>
          <Link class="linkSala" to="/juego/4">
            Sala 4
          </Link>

          <span>{salas[4].jugadores}/2</span>
        </div>
        <div>
          <Link class="linkSala" to="/juego/5">
            Sala 5
          </Link>

          <span>{salas[5].jugadores}/2</span>
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
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Ultimas 10 partidas</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Jugadores con mas victorias</button>
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
                <ol class="p-3">
                    {
                      itemsUltimas10.map((item) => {
                        return <ItemPartida  key={item._id} jugadorX={item.jugadorX.nickname} jugadorO={item.jugadorO.nickname} ganador={item.ganador.nickname} fecha={item.fecha}/>
                      })
                    }
                  </ol>
                </div>
                <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                  
                  <ol class="p-3">
                      {
                        topGanadores.map((item) => {
                          return <ItemUsuario  key={item._id} jugador={item.jugador.nickname}  total={item.totalPartidasGanadas}/>
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