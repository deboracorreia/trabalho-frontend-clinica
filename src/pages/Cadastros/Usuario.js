import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Usuario = () => {
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [contato_emergencia, setContato_emergencia] = useState('');
  const [nome_contato_emergencia, setNome_contato_emergencia] = useState('');

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*.]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 5) {
      alert('O nome de usuário deve ter no mínimo 5 caracteres.');
      return;
    }

    if (!validatePassword(password)) {
      alert(
        'A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.'
      );
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/usuarios', {
        login: username,
        cpf: cpf,
        senha: password,
        nome_completo: name,
        data_nascimento: dateOfBirth,
        endereco: endereco,
        email: email,
        celular: celular,
        contato_emergencia: contato_emergencia,
        nome_contato_emergencia: nome_contato_emergencia,
        
      });
      alert('Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input
            type="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Endereco:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>       
         <div className="form-group">
          <label>Celular:</label>
          <input
            type="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
        </div>         
        <div className="form-group">
          <label>Contato de Emergencia:</label>
          <input
            type="contato_emergencia"
            value={contato_emergencia}
            onChange={(e) => setContato_emergencia(e.target.value)}
            required
          />
        </div>        
        <div className="form-group">
          <label>Nome Contato de Emergencia:</label>
          <input
            type="nome_contato_emergencia"
            value={nome_contato_emergencia}
            onChange={(e) => setNome_contato_emergencia(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="button">Cadastrar</button>
      </form>
    </div>
  );
};

export default Usuario;
