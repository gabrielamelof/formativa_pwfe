import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Paginas/Inicial';
import { Menu } from '../Componentes/Menu';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';
import { Disciplina } from '../Paginas/Disciplina';
import { Professores } from '../Paginas/Professores';
import { DisciplinaCadastrar } from '../Paginas/DisciplinaCadastrar';
import { DisciplinaEditar } from '../Paginas/DisciplinaEditar';
import { ProfessorCadastrar } from '../Paginas/ProfessorCad';
import { ProfessorEditar } from '../Paginas/ProfessorEdit';


export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>

            <Route path='/inicial' element={<Inicial/>}>
                <Route index element={<Menu/>}/>
                <Route path='discprofessor' element={<DisciplinasProfessor/>}/>
                <Route path='disciplina' element={<Disciplina/>}/>
                <Route path='disciplina/disCad' element={<DisciplinaCadastrar/>}/> 
                <Route path='disciplina/editar/:id' element={<DisciplinaEditar/>}/> 
                <Route path='professores' element={<Professores/>}/> 
                <Route path='professores/profCad' element={<ProfessorCadastrar/>}/> 
                <Route path='professores/editar/:id' element={<ProfessorEditar/>}/> 
            </Route>

        </Routes>
    )
}