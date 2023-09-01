import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './routes/Login.jsx';
import SignUp from './routes/SignUp.jsx';
import Dashboard from './routes/Dashboard.jsx';
import Game from './routes/Game.jsx';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { AuthProvider } from './auth/AuthProvider.jsx';

const router = createBrowserRouter([
    {
        path:"/",
        element: <Login />,
    },
    {
        path: "/registro",
        element: <SignUp/>,
    },
    {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard/>,
            }
        ]
    },
    {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/juego",
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
