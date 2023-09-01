export const Note = (props) =>{
    const {name,price} = props;
    //destructuring
    return (
      <li>
        <h2>{name}</h2>
        <p>{price}</p>
      </li>
    );
  };