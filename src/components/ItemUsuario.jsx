export const ItemUsuario = (props) =>{
    const {jugador,total} = props;
    //destructuring
    return (
      <li class="partida">
        <h2>Jugador: {jugador}</h2>
        <h2>Total: 🏆{total}</h2>       
        
      </li>
    );
  };