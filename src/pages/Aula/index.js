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
  const {id} = useParams();
  const history = useHistory();

  useEffect(()=>{
    api.get(`/aula/${id}`,{
      }).then(response =>{
        setIncidents(response.data);
        console.log(response.data);
      })

  },[alunoId, id, incidents]);

  async function handleDeleteIncident(id){
    try {
      await api.get(`incidents/${id}`,{
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
      <img src={logoImg} alt ="Comida"/>
      <span>Bem Vindo(a), {alunoName} </span>

      <Link className="button" to="https://meet.google.com/pzb-dxqr-muw">Ajuda</Link>
      <button onClick={handleLogout} type="button">
        <FiPower size={18} color="#E02041" />
      </button>
    </header>
    <div class="container">

    <h1></h1>
    <ul>
     {incidents.map(incident =>( 
       <li key={incident.id}>
          <strong>{incident.title}</strong>
        <strong>
          <iframe width="1000" height="460" src={incident.VideoLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </strong>
        <strong>Resumo</strong>
        {incident.MateriaAula}
        <strong><Link className="button" to={`/aula/questoes/${incident.id}`} >Proximo Nivel</Link></strong>
      </li>))}
    
    </ul>
    </div>
  </div>
  );
}