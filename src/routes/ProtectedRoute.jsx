//si está autenticado puedo ver el contenido de la ruta
import {Outlet,Navigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../auth/AuthProvider.jsx";

export default function ProtectedRoute(){
    const auth = useAuth();
    //ternario para mostrar si es verdadero, sino al login
    return auth.isAuthenticated ? <Outlet /> : < Navigate to= "/"/>;
}