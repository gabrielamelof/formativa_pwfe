import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Paginas/Inicial';
import { Menu } from '../Componentes/Menu';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';
import { Disciplina } from '../Paginas/Disciplina';
import { Professores } from '../Paginas/Professores';
import { DisciplinaCadastrar } from '../Paginas/DisciplinaCadastrar';
import { DisciplinaEditar } from '../Paginas/DisciplinaEditar';

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
            </Route>

        </Routes>
    )
}