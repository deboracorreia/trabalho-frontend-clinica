import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


const Cliente = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    data_nascimento: '',
  });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/clientes', cliente);
      alert('Cliente cadastrado com sucesso!');
      setCliente({
        nome: '',
        email: '',
        telefone: '',
        data_nascimento: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={cliente.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={cliente.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
        <label>Telefone:</label>
        <input type="text" name="telefone" value={cliente.telefone} onChange={handleChange} required />
        </div>
        <div className="form-group">
        <label>Data de Nascimento:</label>
        <input type="date" name="data_nascimento" value={cliente.data_nascimento} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Cadastrar Cliente</button>
      </form>
    </div>
  );
};

export default Cliente;
