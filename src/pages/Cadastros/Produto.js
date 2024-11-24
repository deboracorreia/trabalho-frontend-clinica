import React, { useState } from 'react';
import axios from 'axios';

const Produto = () => {
  const [produto, setProduto] = useState({
    codigo: '',
    nome: '',
    preco: '',
    marca: '',
    fornecedor: '',
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/produtos', produto);
      alert('Produto cadastrado com sucesso!');
      setProduto({
        codigo: '',
        nome: '',
        preco: '',
        marca: '',
        fornecedor: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Código:</label>
          <input type="text" name="codigo" value={produto.codigo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={produto.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <input type="number" name="preco" value={produto.preco} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Marca:</label>
          <input type="text" name="marca" value={produto.marca} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Fornecedor:</label>
          <input type="text" name="fornecedor" value={produto.fornecedor} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default Produto;
