import React,{useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi';


import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';


export default function Profile(){
  const[idAula,setAula]= useState('');
  const [incidents,setIncidents]= useState([]);
  const alunoName = localStorage.getItem('AlunoNome');
  const alunoId = localStorage.getItem('id');
  const history = useHistory();

  useEffect(()=>{
    api.get('/profile',{
      headers:{
        Authorization:alunoId,
       }
      }).then(response =>{
        setIncidents(response.data);
      })

  },[alunoId]);

  async function handleDeleteIncident(id){
    try {
      await api.get(`aula/${id}`,{
        headers:{
          Authorization: alunoId,
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar caso');
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return(
  <div className="profile-container">
    <header>
      <img src={logoImg} alt ="Aluno"/>
      <span>Bem Vindo(a), {alunoName}</span>

      <Link  className="button" to="/c/">Ajuda</Link>
      
      <button onClick={handleLogout} type="button">
        <FiPower size={18} color="#084259" />
      </button>
    </header>

    <h1>Lista de Aulas</h1>
    <ul>
     {incidents.map(incident =>(
       <li key={incident.id}>
        <strong>{incident.title}</strong>

        <strong>Descrição</strong>
        <p>{incident.description}</p>
        
        <strong><Link className="button" to={`/aula/${incident.id}`}>Iniciar Aula</Link>
        </strong>
        
        
      </li>))}
    
    </ul>
  </div>
  );
}