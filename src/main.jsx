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
        path:"/650a52e134ff5b6ca48cb8ba--dulcet-genie-85298e.netlify.app/",
        element: <Login />,
    },
    {
        path: "/registro",
        element: <SignUp/>,
    },
    {
        path: "/650a52e134ff5b6ca48cb8ba--dulcet-genie-85298e.netlify.app/",
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/650a52e134ff5b6ca48cb8ba--dulcet-genie-85298e.netlify.app//lobby",
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
