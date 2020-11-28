import React,{useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api';

import logoimg from '../../assets/entregador.png';

export default function Register(){
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [value,setValue] = useState('');

  const ongID =localStorage.getItem('ongID');
  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();
    const data ={
      title,
      description,
      value,
    };

    try {
      await api.post('incidents',data,{
        headers:{
          Authorization: ongID ,
        }
      })
      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar');
    }

  }

  return(
    <div className="new-incident-container">
  <div className="content">
    <section>
    <img src={logoimg} alt="Comida"/>

    <h1>Cadastrar Produto</h1>

    <p>Cadastro de Produtos</p>
    <Link className="back-link" to="/profile">
      <FiArrowLeft  size={16} color='#E02041'/>Voltar Para Home
    </Link>      
    </section>

    <form onSubmit={handleNewIncident}>
      <input 
      placeholder="Produto"
      value={title}
      onChange={e => setTitle(e.target.value)}
      />
      <textarea 
      placeholder="Receita"
      value={description}
      onChange={e => setDescription(e.target.value)}
      />
      <input 
      placeholder="Valor" 
      value={value}
      onChange={e => setValue(e.target.value)}
      />
      <button className="button" type="submit">Cadastrar</button>
    </form>
  </div>
</div>
  )
}