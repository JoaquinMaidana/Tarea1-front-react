export const ItemPartida = (props) =>{
    const {jugadorX,jugadorO,ganador, fecha} = props;
    //destructuring
    return (
      <li class="partida">
        <h2>Jugador X: {jugadorX}</h2>
        <h2>Jugador O: {jugadorO}</h2>
        <h2>Ganador: {ganador}🥇</h2>
        <h2>Fecha: {fecha}</h2>
        
      </li>
    );
  };