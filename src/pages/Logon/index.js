import React,{useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import './styles.css';
import {Link,useHistory} from 'react-router-dom';

import api from '../../services/api';

import logoimg from '../../assets/logo.png';
import herosimg from '../../assets/comida.png';
export default function Logon(){
const[email,setemail]= useState('');
const[senha,setsenha]= useState('');
const history = useHistory();

async function handleLogin(e){
  e.preventDefault();

  try {
    const response = await api.post('sessions',{email,senha});

    localStorage.setItem('AlunoSenha',senha);
    localStorage.setItem('AlunoNome',response.data.name);
    localStorage.setItem('id',response.data.id);
    history.push('/profile');
  } catch (error) {
    alert('Usuario ou senha invalido')
  }
}

  return(
  <div className="logon-container">
    <section className="form">
    <img src={logoimg} alt='Heros'/>
    <form>
      <h1> Faça seu Login</h1>
      <input 
      type="email" 
      placeholder="Email"
      value={email}
      onChange={e => setemail(e.target.value)}
      />
      <input 
      type="password" 
      placeholder="Senha"
      value={senha}
      onChange={e => setsenha(e.target.value)}
      />
      <button onClick={handleLogin} className="button" type="submit">Entrar</button>
      <Link className="back-link" to="/register"><FiLogIn size={16} color='#465973'/>Não tenho cadastro</Link>

    </form>

    </section>
    <img src={herosimg} alt='Heros'/>
  </div>
  );
}