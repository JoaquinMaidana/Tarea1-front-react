import PortalLayout from "../layout/PortalLayout";
import React, { Component } from 'react';

import '../App.css';
import BoardWrapper from '../components/Board';
export default function Game(){
    return(
    <PortalLayout>   
        <h1>Juego</h1>
        <p class="reglas">Reglas del juego: el primer jugador en lograr una combinación de tres simbolos en linea gana la partida</p>
        <div className="game">
          <div className="game-board">
            <BoardWrapper />
          </div>
          
      </div>
      
    </PortalLayout>  
    ); 
}