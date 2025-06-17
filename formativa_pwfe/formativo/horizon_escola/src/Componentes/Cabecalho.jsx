import estilos from './Cabecalho.module.css';
import logo from '../assets/logo.svg'

export function Cabecalho(){
    return(
        <header className={estilos.container}>
            <div className={estilos.logo}>
                <img src={logo} alt="" />
            </div>
                 <nav className={estilos.navbar}>
                        <ul> 
                            <li>Home</li>
                            <li>Professores</li>
                            <li>Disciplinas</li>
                            <li>Reservas</li>
                        </ul>
                    </nav>
            
        </header>
    )
}