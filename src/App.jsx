import { useEffect,useState } from 'react';
import {Note} from "./components/Note.jsx";
import { getAllProducts } from './services/products/getAllProducts.js';
import { createProduct } from './services/products/createProduct.js';
import './App.css'




function App() {
  const [notes,setNotes] = useState([]);
  const [newNote,setNewNote] = useState('');

  useEffect(()=>{
     console.log("useEffect");
     //usar axios mas adelante
      getAllProducts()
        .then((products)  =>{
          setNotes(products);
        });
      
  },[]);
  //se le pone la dependencia a lo ultimo

  const handleChange = (event) =>{
    setNewNote(event.target.value);
    console.log(newNote);
  }

  const handleSubmit = (event) =>{
    event.preventDefault();


    console.log('crear nota');
    console.log(newNote);
    const noteToAddToState = {
      
       name: newNote,
       price: 123,
       
    }
    console.log(noteToAddToState);
    createProduct(noteToAddToState)
    .then(note =>{
      console.log("el producto es: "+note);
      setNotes((prevNotes) => prevNotes.concat(note));
    })
    .catch((error)=>{
      console.log(error);
    });
    
    setNewNote("");
  };


  return (
    <div>
      <h1>Productos</h1>
      <ol>
        {
          notes.map((note) =>{
            return  <Note key={note._id} {...note} />
          })
        }
      </ol>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button >Crear Nota</button>
      </form>
    </div>
  );
}

export default App
