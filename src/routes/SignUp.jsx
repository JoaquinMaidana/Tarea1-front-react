import PortalLayout from "../layout/PortalLayout";
import {useAuth} from "../auth/AuthProvider";
import {Navigate} from "react-router-dom";
import { createUsuario } from '../services/usuarios/createUsuario.js';

import React, {  useState,useEffect } from "react";
export default function SignUp(){
    //estado para cada input
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();

    const handleSubmit = (event) =>{
        event.preventDefault();
    
        console.log('crear usuario');
        
        const nuevoUsuario = {
        
            nickname: nickname,
            email: email,
            password: password,
        
        }
        console.log(nuevoUsuario);
        createUsuario(nuevoUsuario)
        .then(usuario =>{
        console.log("el usuario es: "+usuario);
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
        <PortalLayout>           
            
            <div class="container d-flex justify-content-center align-items-center w-100 h-100 ">
                <div class="row w-100">
                    <div class="col-4 m-auto">
                        <h1>Registro</h1>
                        <form class="mt-5" onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label colorWhite">Nickname</label>
                                <input 
                                    type="text" 
                                    value={nickname} 
                                    class="form-control"
                                    onChange={(e) => setNickname(e.target.value)}  
                                />
                               
                            </div>
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
                            
                            <button type="submit" class="btn btn-primary">Registrarme</button>
                        </form>
                    </div>

                </div>
               
            </div>
        </PortalLayout>
    </> 
    ); 
}