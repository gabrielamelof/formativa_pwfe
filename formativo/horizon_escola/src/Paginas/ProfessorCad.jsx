import { useForm } from 'react-hook-form';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Visualizar.module.css';
import { useState, useEffect } from 'react';
 
const schemaProfessor = z.object({
    username: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    ni: z.number({
        invalid_type_error: 'Informe um número identificador'
                            }).min(1, 'Informe um número identificador'),
    telefone: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(20, 'Informe até 20 caracteres'),
    data_nascimento: z.preprocess(arg => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ invalid_type_error: 'Informe a data de nascimento' })),
    data_contratacao: z.preprocess(arg => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ invalid_type_error: 'Informe a data de contratação' })),
    password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});
 
export function ProfessorCadastrar() {
 
    const [professores, setProfessores] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaProfessor)
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

      function formatarData(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

        try {
            const token = localStorage.getItem('access_token');

             const payload = {
                ...data,
                data_nascimento: formatarData(data.data_nascimento),
                data_contratacao: formatarData(data.data_contratacao),
                tipo: "P",             // tipo fixo para professor
                // password: "Senha123!", // senha fixa para testes, pode ajustar depois
            };

            
            const response = await axios.post(
                'http://127.0.0.1:8000/api/usuario/',
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        
            console.log('Professor cadastrado com sucesso!', response.data);
            alert('Professor cadastrado com sucesso!');
            reset();
 
        } catch (error) {
            console.error('Erro ao cadastrar professor', error);
            alert("Erro ao cadastrar professor");
            console.log("erro", error.response?.data || error.message);

        }
    }
 
    return (
        <div className={estilos.container}>
           
            <form className={estilos.crudForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2 className={estilos.titulo}>Cadastro de Professor</h2>
               
 
                    <label className ={estilos.nomeCampo}>Nome do profesosr</label>
                    <input
                        className={estilos.inputField}
                        {...register('username')}
                        placeholder="Desenvolvimento de Sistema"
                    />
                    {errors.username && <p className={estilos.error}>{errors.username.message}</p>}
               
 
                    <label className ={estilos.nomeCampo}>Número identificador</label>
                    <input
                     type="number"
   
                        className={estilos.inputField}
                        {...register('ni', { valueAsNumber: true })}
                        placeholder="75"
                    />
                    {errors.ni &&
                    <p className={estilos.error}>
                        {errors.ni.message}
                    </p>}

                    <label className ={estilos.nomeCampo}>Data de Nascimento</label>
                    <input
                     type="date"
   
                        className={estilos.inputField}
                        {...register('data_nascimento')}
                        placeholder="75"
                    />
                    {errors.data_nascimento &&
                    <p className={estilos.error}>
                        {errors.data_nascimento.message}
                    </p>}

                    <label className ={estilos.nomeCampo}>Data de Contratação</label>
                    <input
                     type="date"
   
                        className={estilos.inputField}
                        {...register('data_contratacao')}
                        placeholder="75"
                    />
                    {errors.data_contratacao &&
                    <p className={estilos.error}>
                        {errors.data_contratacao.message}
                    </p>}

                    <label className ={estilos.nomeCampo}>Telefone</label>
                    <input
   
                        className={estilos.inputField}
                        {...register('telefone')}
                        placeholder="75"
                    />
                    {errors.telefone &&
                    <p className={estilos.error}>
                        {errors.telefone.message}
                    </p>}

                    <label className ={estilos.nomeCampo}>Senha</label>
                    <input
                     type="password"
   
                        className={estilos.inputField}
                        {...register('password')}
                        placeholder="75"
                    />
                    {errors.password &&
                    <p className={estilos.error}>
                        {errors.password.message}
                    </p>}
 
                <button className={estilos.submitButton} type="submit">
                    Cadastrar
                </button>
                
            </form>
        </div>
    );
}