import estilos from './Menu.module.css';
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplina.png';
import professor from '../assets/professor.png';
import gestor from '../assets/gestor.png';
import { Link } from 'react-router-dom';
import { Professores } from '../Paginas/Professores';

export function Menu(){
    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? 'discprofessor' : 'disciplina';

    return(
        <div className={estilos.container}>
            <div className={estilos.card}>
               <Link className={estilos.Link} to= {linkDisciplina}> 
                    <img className={estilos.icone} src={disciplina} alt="" />
                    <label alt='Disciplinas do Professor'>Disciplinas</label> 
                </Link> 
            </div>

             <div className={estilos.card}>
               <Link className={estilos.Link} to= {linkDisciplina}> 
                    <img className={estilos.icone} src={ambiente} alt="" />
                    <label alt='Disciplinas do Professor'>Ambientes</label> 
                </Link> 
            </div>

             <div className={estilos.card}>
               <Link className={estilos.Link} to= {linkDisciplina}> 
                    <img className={estilos.icone} src={gestor} alt="" />
                    <label alt='Disciplinas do Professor'>Gestor</label> 
                </Link> 
            </div>

             <div className={estilos.card}>
               <Link className={estilos.Link} to= "/inicial/professores"> 
                    <img className={estilos.icone} src={professor} alt="" />
                    <label alt='Disciplinas do Professor'>Professor</label> 
                </Link> 
            </div>
        </div>
    )
}