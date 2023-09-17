import PortalLayout from "../layout/PortalLayout";
import React, { Component } from 'react';

import '../App.css';
import BoardWrapper from '../components/Board';
export default function Game(){
    return(
    <PortalLayout>   
        <h1>Juego</h1>
        <div className="game">
        <div className="game-board">
          <BoardWrapper />
        </div>
        <div className="game-info">
          <div>{/* se hace en board */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    </PortalLayout>  
    ); 
}