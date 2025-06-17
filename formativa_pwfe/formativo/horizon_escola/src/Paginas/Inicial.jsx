// import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router-dom";
import Banner from "../assets/banner.svg";
import estilos from './Inicial.module.css';

export function Inicial(){
    return(
        <>
            <Cabecalho/>
            <div className={estilos.banner}>
                <img src={Banner}/>
            </div>
            <h1 className={estilos.titulo}>Funcionalidades</h1>
                
            <Outlet/>
        </>
    )
}