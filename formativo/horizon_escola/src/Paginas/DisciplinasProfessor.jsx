import axios from 'axios'; //permite chamar uma api
import React,{useState, useEffect} from 'react';
//State guarda o estado atual da , effect mostra isso em tela
import estilos from './Visualizar.module.css';

export function DisciplinasProfessor(){
    const [disciplinas, setDisciplina] = useState([]);

    //() - parametros / {} - script / [] - dependencias, aqui mostro o que vou chamar
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/professor/disciplinas/', {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response =>{
            setDisciplina(response.data);
        })
        .catch(error =>{
            console.error("Erro", error);
        });

    },[]);
    return(
        <div className={estilos.wrapper}>
            <div className={estilos.containerCard}>
            <h2 className={estilos.tituloCard}>Minhas Disciplinas</h2>
            <div className={estilos.listaCard}>
                {disciplinas.map(disciplina=>(
                    <div className={estilos.nome} key={disciplina.id}>
                        <h3 className={estilos.nome}>{disciplina.nome}</h3>
                        <p><strong>Curso: {disciplina.curso}</strong></p>
                        <p><strong>Descrição: {disciplina.descricao}</strong></p>
                        <p><strong>Carga horário: {disciplina.carga_horaria}</strong></p>

                    </div>

                ))}
            </div>
        </div>
        </div>
        

    );
}