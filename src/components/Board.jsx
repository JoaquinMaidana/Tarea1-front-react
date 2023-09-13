import React, { Component } from 'react';
import { calculateWinner } from './helpers';
import Square from './Square';
import { io } from 'socket.io-client';



class Board extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:1234/game');
    console.log("socket juego");
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
    };
  }


  componentDidMount() {
    // Escuchar eventos de Socket.IO para actualizar el estado del juego
    this.socket.on('jugada', (indice) => {
      this.handleClick(indice);
    });

    
    console.log("juego");
  }

  componentWillUnmount() {
    // Cierra la conexión del socket aquí
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
      status = 'Winner: ' + winner;
      //emitir evento al server o peticion nomas

    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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

export default Board;