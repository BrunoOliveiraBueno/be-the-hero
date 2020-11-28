import React,{useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api';

import logoimg from '../../assets/logo.png';

export default function Register(){
  const[name,setName]= useState('');
  const[email,setEmail]= useState('');
  const[senha,setsenha]= useState('');
  const[city,setCity]= useState('');
  const[uf,setUf]= useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();
    const data = {
      name,
      email,
      senha,
      city,
      uf,
    };

    try{
      const response= await api.post('aluno', data);

      alert(`Aluno Cadastrado com Sucesso`);

      history.push('/');
    }catch(err){
      alert('Erro no Cadastro, tente novamente');
    }

  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
        <img src={ logoimg} alt="Comida"/>

        <h1>Cadastro Aluno</h1>

        <p>Aprendendo a pensar e construir algoritmos com linguagem de programação C </p>
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color='#124673'/>Ja tenho cadastro
        </Link>      
        </section>

        <form onSubmit={handleRegister}>
          <input 
          placeholder="Nome do Aluno"
          value={name}
          onChange={e => setName(e.target.value)}
          />
          <input 
          type="Email" 
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
          <input 
          type="password"
          placeholder="Senha" 
          value={senha}
          onChange={e => setsenha(e.target.value)}
          />

          <div className="input-group">
            <input 
            placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
            />
            <input 
            placeholder="UF" 
            style={{width:80}}
            value={uf}
            onChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}