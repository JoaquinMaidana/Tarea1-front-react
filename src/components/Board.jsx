import React, { Component } from 'react';
import { calculateWinner } from './helpers';
import Square from './Square';
import { io } from 'socket.io-client';
import { useAuth } from "../auth/AuthProvider";
import { useParams } from "react-router-dom";
import { createPartida } from '../services/partida/createPartida.js';
import {Navigate, useNavigate} from "react-router-dom";


function BoardWrapper() {
  const auth =  useAuth();
  
  const nickname =  auth.getUser().nickname;
  const id = auth.getUser()._id;
  const { sala } = useParams();
  console.log(nickname);
  return <Board nickname={nickname} id={id}  sala={sala}/>;
  
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:1234/game', {
      query: {
        nickname: props.nickname,
        id: props.id,
        sala: props.sala // Reemplaza 'TuNicknameAquí' con el nickname real
      },
    });
    //this.playerX = 'sin asignar';
    //this.playerO = 'sin asignar';
   
    console.log("socket juego");
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      winnerNickname:null,
      playerX: "sin asignar", 
      playerO: "sin asignar",
      playerXid:"",
      playerOid:"",
      nickname: props.nickname,
    };
  }
  

  componentDidMount() {
    
    this.socket.on('jugada', (indice) => {
      this.handleClick(indice);
    });

    this.socket.on('posicion', (obj) => {
      if(obj.posicion == 'X'){
          this.setState({ playerX: obj.jugador });
          this.setState({ playerXid: obj.idJugador });
        
      }else{
        this.playerO = obj.nickname;
        this.setState({ playerO: obj.jugador });
        this.setState({ playerOid: obj.idJugador });
        this.setState({ playerX: obj.jugadorX });
        this.setState({ playerXid: obj.idJugadorX });
        
      }
    });

      this.socket.on('cerroOtro', (obj) => {
        this.socket.disconnect();

      // Crea una nueva conexión con los mismos datos
      this.socket = io('http://localhost:1234/game', {
        query: {
          nickname: this.state.nickname,
          id: this.props.id,
          sala: this.props.sala,
        },
      });
    });

    
    console.log("juego");
  }

  componentWillUnmount() {
    this.socket.emit('finalizar');
    this.socket.disconnect();
  }

  
  

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const winner = calculateWinner(squares);
   
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: winner,
    });

    this.socket.emit('jugada', i);

    if (winner) {
      setTimeout(() => {
        this.setState({
          squares: Array(9).fill(null),
          xIsNext: true,
          winner: null,
        });
      }, 2000); 
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = this.state.winner;
    let status;
    if (winner) {
      
      if(winner =='X'){
        status = 'Ganador: ' + this.state.playerX;

        if(this.state.nickname == this.state.playerX){
            //enviar el resultado de la partida
            console.log(this.state.playerXid);
            console.log(this.state.playerOid);
            console.log(this.state.nickname + "envia");
            createPartida(this.state.playerXid,this.state.playerOid,this.state.playerXid)
        .then(partida =>{
            console.log(partida);
           
        })
        .catch((error)=>{
        console.log(error);
        });
        }
      }else{
        status = 'Ganador: ' + this.state.playerO;
        if(this.state.nickname == this.state.playerO){
          console.log(this.state.nickname + "envia");
          console.log(this.state.playerXid);
            console.log(this.state.playerOid);
          createPartida(this.state.playerXid,this.state.playerOid,this.state.playerOid)
          .then(partida =>{
              console.log(partida);
             
          })
          .catch((error)=>{
          console.log(error);
          });
        }
      }
      
      //emitir evento al server o peticion nomas

    } else {
      status = 'Siguiente jugador: ' + (this.state.xIsNext ? this.state.playerX : this.state.playerO);
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default BoardWrapper;