import styled from 'styled-components';

const UlMensajes = styled.ul`
    width: 40vw;
    margin: 10px auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
    
`;

const LiMensaje = styled.li`
    background-color: #ffcccb;
    border: 1px solid #ff0000;
    box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 10px #ff0000; /* Sombras para el efecto neon en el borde */
    padding: 10px 20px;
    margin-bottom: 12px;
`

export {
    UlMensajes, LiMensaje
}