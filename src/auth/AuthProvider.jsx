//usa el useContext para poder manejar un estado global

import React, { useContext,createContext, useState,useEffect } from "react";
import { infoUsuario } from '../services/usuarios/infoUsuario.js';
const AuthContext = createContext({
  isAuthenticated: false,
  getToken: () => "",
  getPosition: () => "",
  savePosition: () => "",
  saveUser: (token) =>{},
  getTokenL: () =>{},
  getUser: () =>{},
  logout: () =>{},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [user,setUser] = useState({});
  const [position,setPosition] = useState("");
  //estado user
  useEffect (() => {
    
    checkAuth();
  },[]);

  async function getUserInfo(token) {
    try {
      const data = await infoUsuario({ token }); // Esperar la respuesta de infoUsuario
      console.log("la data es: " + data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
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
            const userInfo = await getUserInfo(token);
            if(userInfo){
              setToken(token);
              localStorage.setItem("token",JSON.stringify(token));
              setIsAuthenticated(true);
              setUser(userInfo);
              console.log(userInfo);
            }
        }
      }
  }

  function getToken(){
      return token;
  }

  function getUser(){
    return user;
  }

  function getPosition(){
      return position;
  }

  function savePosition(position){
      setPosition(position);
  }

  function logout(){
    localStorage.removeItem("token");
    setIsAuthenticated(false);
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


  function saveUser(token){
    setToken(token);
    localStorage.setItem("token",JSON.stringify(token));
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getToken, saveUser, getTokenL, getUser, logout , getPosition, savePosition}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
