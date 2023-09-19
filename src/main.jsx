import React from 'react'
import ReactDOM from 'react-dom/client'


import Login from './routes/Login.jsx';
import SignUp from './routes/SignUp.jsx';
import Lobby from './routes/Lobby.jsx';
import Game from './routes/Game.jsx';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { AuthProvider } from './auth/AuthProvider.jsx';

const router = createBrowserRouter([
    {
        path:"/Tarea1-front-react",
        element: <Login />,
    },
    {
        path: "/registro",
        element: <SignUp/>,
    },
    {
        path: "/Tarea1-front-react",
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/Tarea1-front-react/lobby",
                element: <Lobby/>,
            }
        ]
    },
    {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/juego/:sala",
                element: <Game/>,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router ={router}/>
    </AuthProvider>
    
  
)
