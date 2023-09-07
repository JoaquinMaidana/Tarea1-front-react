//usa el useContext para poder manejar un estado global

import React, { useContext,createContext, useState,useEffect } from "react";
import { infoUsuario } from '../services/usuarios/infoUsuario.js';
const AuthContext = createContext({
  isAuthenticated: false,
  getToken: () => "",
  saveUser: (token) =>{},
  getTokenL: () =>{},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  //estado user
  useEffect (() => {
    
    checkAuth();
  },[]);

  async function getUserInfo(token_){
    infoUsuario(token_)
    .then(data =>{
    console.log("la data es: "+data);
        return data;   
    })
    .catch((error)=>{
    console.log(error);
    return null;
    });
  }

  async function checkAuth(){
      if(token){
        //si el usuario esta autenticado
        
      }else{
        console.log("llega aca");
        const token = getTokenL();
        if(token){
            setToken(token);
            setIsAuthenticated(true);
        }
      }
  }

  function getToken(){
      return token;
  }

  function getTokenL(){
    const tokenData = localStorage.getItem("token");
    console.log("Se ejecuta el obtener del local storage");
    if(tokenData){
        const token = JSON.parse(tokenData);
        return token;
    }
    return null;
  }

  //falta traer los datos del usuario tambien
  function saveUser(token){
    setToken(token);
    localStorage.setItem("token",JSON.stringify(token));
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getToken, saveUser, getTokenL }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
