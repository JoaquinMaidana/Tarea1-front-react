import { Children } from "react";
import { Link } from "react-router-dom";

export default function DefaultLayout({ children }) {
    return (
        <>
            <header>
                
            </header>

            <main>
                {children}
            </main>

            <footer class="d-flex justify-content-center">
                <div class="footContainer">
                <img class="imagenTip" src="/Tarea1-front-react/TI-logo.png" alt="Imagen Tip" />   -  Creado por Joaquín Maidana - 2023
                </div>
             
            </footer>
        </>
    );
}