import DefaultLayout from "../layout/DefaultLayout";
import {useAuth} from "../auth/AuthProvider";
import {Navigate, useNavigate} from "react-router-dom";
import { loginUsuario } from '../services/usuarios/loginUsuario.js';
import { Link } from "react-router-dom";
import React, {  useState,useEffect } from "react";
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();
    const handleSubmit = (event) =>{
        event.preventDefault();
    
        console.log('crear usuario');
        
        const nuevoUsuario = {
        
            email: email,
            password: password,
        
        }
        console.log(nuevoUsuario);
        loginUsuario(nuevoUsuario)
        .then(usuario =>{
        console.log("el token es: "+usuario.token);
            if(usuario.token){
                auth.saveUser(usuario.token);
                goTo("/Tarea1-front-react");
            }
           
        })
        .catch((error)=>{
        console.log(error);
        });
       
    };
    if(auth.isAuthenticated)
    {
        return <Navigate to="/Tarea1-front-react/lobby" />
    }
    return(
        <>
            <DefaultLayout>           
                
            <div class="container d-flex justify-content-center align-items-center w-100 h-100 ">
                <div class="row w-100">
                    <div class="col-4 m-auto">
                            <h1 class="w-70">Inicio de sesión</h1>
                            <form class="mt-5" onSubmit={handleSubmit}>
                                                   
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label colorWhite">Correo</label>
                                <input 
                                    type="text" 
                                    value={email} 
                                    class="form-control"
                                    onChange={(e) => setEmail(e.target.value)}  
                                />
                                
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label colorWhite">Password</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    class="form-control"
                                    onChange={(e) => setPassword(e.target.value)}  
                                />
                            </div>
                                <Link to="/registro">
                                    No tienes cuenta? registrate!
                                </Link>
                                <br></br>
                                <button type="submit" class="btn btn-primary">Inicar Sessión</button>
                            </form>
                        </div>

                    </div>
                   
                </div>
            </DefaultLayout>
        </>
    ); 
}