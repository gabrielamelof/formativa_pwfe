import estilos from './BarraNavegacao.module.css';

export function BarraNavegacao(){
    return(
        <nav className={estilos.container}>
            <ul> 
                <li>Home</li>
                <li>Professores</li>
                <li>Disciplinas</li>
                <li>Reservas</li>
            </ul>
        </nav>
    )
}