import axios from "axios";
import estilos from './Visualizar.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import add from '../assets/add.png';
import edit from '../assets/edit.png';
import del from '../assets/delete.png';

export function Professores() {
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      setProfessores(response.data); // Armazena array no estado
    })
    .catch(error => {
      console.error("Erro ao buscar professores:", error);
    });
  }, []);

  // Cria objeto para lookup rápido: id → username
  const professoresPorId = {};
  professores.forEach(prof => {
    professoresPorId[prof.id] = prof.username;
  });

  // Função para excluir professor
  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este professor?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      alert('Professor excluído com sucesso!');
      // Atualiza lista removendo excluído
      setProfessores(prev => prev.filter(prof => prof.id !== id));
    })
    .catch(error => {
      console.error('Erro ao excluir professor:', error);
      alert('Erro ao excluir o professor.');
    });
  };

  return (
    <main className={estilos.container}>
      <h3 className={estilos.titulo}>Professores</h3>

      <div className={estilos.topoAcoes}>
        <Link to="profCad" className={estilos.botaoAdicionar}>
          <img src={add} alt="Adicionar" className={estilos.iconeAdd} />
        </Link>
      </div>

      <div className={estilos.tabelaWrapper}>
        <table className={estilos.tabelaDados}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>NI</th>
              <th>Telefone</th>
              <th>Data de Nascimento</th>
              <th>Data de Contratação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {professores.map(professor => (
              <tr key={professor.id}>
                <td>{professor.username}</td>
                <td>{professor.ni}</td>
                <td>{professor.telefone}</td>
                <td>{professor.data_nascimento}</td>
                <td>{professor.data_contratacao}</td>
                <td className={estilos.acoes}>
                  <Link to={`/inicial/usuario/editar/${professor.id}`}>
                    <img src={edit} className={estilos.icone} alt="Editar" />
                  </Link>
                  <img
                    src={del}
                    alt="Excluir"
                    className={estilos.icone}
                    onClick={() => handleDelete(professor.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
