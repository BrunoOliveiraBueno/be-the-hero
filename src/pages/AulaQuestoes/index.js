import React,{useState,useEffect} from 'react';
import {Link, useHistory,useParams} from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi';


import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';


export default function Profile(){

  
  const [incidents,setIncidents]= useState([]);
  const alunoName = localStorage.getItem('AlunoNome');
  const alunoId = localStorage.getItem('id');
  const history = useHistory();

 const {id} = useParams();
  
  useEffect(()=>{
    api.patch(`/aula/questoes/${id}`,{
      headers:{
        Authorization:alunoId,
       }
      }).then(response =>{
        setIncidents(response.data);
      })

  },[alunoId, id]);

  async function handleDeleteIncident(id){
    try {
      await api.get(`aula/${this.params.id}`,{
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

      <Link  className="button" to="/c/">Proximo Nivel</Link>
      
      <button onClick={handleLogout} type="button">
        <FiPower size={18} color="#084259" />
      </button>
    </header>

    <h1>Questões</h1>
    
    <ul>
     {incidents.map(incident =>(
       <li key={incident.id}>
        <strong>{incident.description}</strong>
        <strong>Assinale a alternativa correta</strong>
        <p>A.{incident.resposta}</p>
        <p>B.{incident.resposta}</p>
        <p>C.{incident.resposta}</p>
      </li>))}
    
    </ul>
  </div>
  );
}