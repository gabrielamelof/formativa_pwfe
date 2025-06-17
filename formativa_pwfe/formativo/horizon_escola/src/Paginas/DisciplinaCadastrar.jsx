import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Visualizar.module.css';
import { useState, useEffect } from 'react';
 
const schemaDisciplina = z.object({
    nome: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    curso: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    cargaHoraria: z.number({
        invalid_type_error: 'Informe a cargahorária'})
        .int("Deve ser um número inteiro")
        .min(1, "A carga horária mínima é 1 hora")
        .max(260, "A carga horária máxima é 260 horas"),
    descricao: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(300, 'Informe até 300 caracteres'),
    professor: z.number({
        invalid_type_error: 'Selecione um professor'
                            }).min(1, 'Selecione um professor')
});
 
export function DisciplinaCadastrar() {
 
    const [professores, setProfessores] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina)
    });
 
    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // setProfessores(response.data);
                const professoresFiltrados = response.data.filter(user => user.tipo === 'P');
                setProfessores(professoresFiltrados);
            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }
        }
        buscarProfessores();
    }, []);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');

            const payload = {
            ...data,
            carga_horaria: data.cargaHoraria,
            };
            delete payload.cargaHoraria;
            
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/',
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        
            console.log('Disciplina cadastrado com sucesso!', response.data);
            alert('Disciplina cadastrado com sucesso!');
            reset();
 
        } catch (error) {
            console.error('Erro ao cadastrar disciplina', error);
            alert("Erro ao cadastrar disciplina");
        }
    }
 
    return (
        <div className={estilos.container}>
           
            <form className={estilos.crudForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2 className={estilos.titulo}>Cadastro de Disciplina</h2>
                    <label className ={estilos.nomeCampo} >Nome da Disciplina</label>
                    <input                        
                        className={estilos.inputField}
                        {...register('nome')}
                        placeholder="Materia"
                    />
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
               
 
                    <label className ={estilos.nomeCampo}>Nome do curso</label>
                    <input
                        className={estilos.inputField}
                        {...register('curso')}
                        placeholder="Desenvolvimento de Sistema"
                    />
                    {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
               
 
                    <label className ={estilos.nomeCampo}>Carga horária</label>
                    <input
                     type="number"
   
                        className={estilos.inputField}
                        {...register('cargaHoraria', { valueAsNumber: true })}
                        placeholder="75"
                    />
                    {errors.cargaHoraria &&
                    <p className={estilos.error}>
                        {errors.cargaHoraria.message}
                    </p>}
               
 
                <label className ={estilos.nomeCampo}>Descrição</label>
                <textarea
                    className={estilos.inputField}
                    {...register('descricao')}
                    placeholder="Descreva o curso com até 2000 caracteres"
                    rows={5}
                    />
                    {errors.descricao && <p className={estilos.error}>{errors.descricao.message}</p>}
               
                    <label className ={estilos.nomeCampo}>Professor</label>
                    <select className={estilos.inputField}
                    {...register('professor', { valueAsNumber: true })}>
                        <option  value="">Selecione um professor</option>
                        {professores.map((prof) => (
                            <option className={estilos.inputField} key={prof.id} value={prof.id}>
                                {prof.username}
                            </option>
                        ))}
                    </select>
                    {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
               
 
                
                <button className={estilos.submitButton} type="submit">
                    Cadastrar
                </button>
                
            </form>
        </div>
    );
}