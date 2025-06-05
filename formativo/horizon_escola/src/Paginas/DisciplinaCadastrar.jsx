import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';

const schemaDisciplinas = z.object({
    nome: z.string()
        .min(1, 'Informe um nome')
        .max(100, 'Informe no máximo 100 caracteres'),
    curso: z.string()
        .min(1, 'Informe um curso')
        .max(255, 'Informe no máximo 255 caracteres'),
    cargaHoraria: z.number(
        {invalid_type_error: 'Informe uma carga horária'})
        .int("Digite um valor inteiro")
        .min(1, 'Informe um valor')
        .max(260, 'A carga horária máxima é de 250h'),
    descricao: z.string()
        .min(1,'Informe a descrição')
        .max(255,'Informe no máximo 255 caracteres'),
    cargaHoraria: z.number(
        {invalid_type_error: 'Selecione um professor'})
        .int("Digite um valor inteiro")
        .min(1, 'Selecione um professor')

});

export function DisciplinaCadastrar(){
    const [professores, setProfessores] = useState([]);

    const{
        register,
        handleSubmit,
        formState: { errors},
    } = useForm({

        resolver: zodResolver(schemaDisciplinas)
    });

    useEffect(() =>{
        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('access_token')
                const response = await axios.get('http://127.0.0.1/8000/api/professores/'),{
                    headers:{
                        'Authorization' : `Bearer ${token}`
                    }
                });
                setprofessores(response.data);
            }catch(error){
                console.error("error", error);
            }
        buscarProfessores()
        }[]);

    async function obterDdosFormulario(data) {
        console.log("Dados do formulário", data);
        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/',
                data,{
                    headers:{
                        'Authorization':`Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                }
            );
            alert("Disciplina cadastrada com sucesso");
            reset();
        }catch(error){
            console.error("erro", error)
            alert("erro ao cadastrar")
        }
    }
        


