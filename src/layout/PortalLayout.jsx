import { Children } from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import {Navigate, useNavigate} from "react-router-dom";

export default function PortalLayout({ children }) {
    const auth = useAuth();
    const goTo = useNavigate();
    const handleSignOut = (event) => {
        event.preventDefault();

        console.log("click");
        auth.logout(); // Llama a la función de logout aquí
        goTo('/'); // Redirige a la página de logout o donde quieras después del logout
    };
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            Tarea 1
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link active" to="/lobby">
                                    Lobby
                                </Link>                               
                              
                                <a className="nav-link" onClick={handleSignOut}>
                                    Cerrar Sesión
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                {children}
            </main>

            <footer class="d-flex align-items-center flex-column">
                <div class="footContainer">
                <img class="imagenTip" src="../public/TI-logo.png" alt="Imagen Tip" />   -  Creado por Joaquín Maidana - 2023
                
                
                
             
                </div>
                <br></br>
                <div>
                Atribuciones: 
                <a href="https://www.vecteezy.com/free-vector/gaming-background">Gaming Background Vectors by Vecteezy</a>
                </div>
              
                
            </footer>
        </>
    );
}