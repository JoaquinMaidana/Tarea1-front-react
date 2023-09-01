import { Children } from "react";
import { Link } from "react-router-dom";

export default function DefaultLayout({ children }) {
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
                                <Link className="nav-link active" to="/dashboard">
                                    Dashboard
                                </Link>
                                <Link className="nav-link" to="/registro">
                                    Registro
                                </Link>
                                <Link className="nav-link" to="/juego">
                                    Juego
                                </Link>
                                <Link className="nav-link" to="/">
                                    Inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                {children}
            </main>

            <footer class="d-flex justify-content-center">
                <div class="footContainer">
                <img class="imagenTip" src="../public/TI-logo.png" alt="Imagen Tip" />   -  Creado por Joaquín Maidana - 2023
                </div>
             
            </footer>
        </>
    );
}