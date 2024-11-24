import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import Tratamento from './Tratamento';

const Tratamento = () => {
  const [tratamentos, setTratamentos] = useState([]);
  const [tratamento, setTratamento] = useState({ codigo: '', nome_tratamento: ''});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [busca, setBusca] = useState('');
  const [editando, setEditando] = useState(null);

  const tratamentoPorPagina = 10;

  const carregarTratamentos = useCallback(async () => {
    try {
      const resposta = await axios.get(`http://localhost:3001/api/tratamento`, {
        params: { page: paginaAtual, limit: tratamentoPorPagina, search: busca },
      });
     
      setTratamentos(resposta.data.tratamentos || []);
      setTotalPaginas(resposta.data.totalPages);
    } catch (error) {
      console.error('Erro ao carregar tratamentos:', error);
    }
  }, [paginaAtual, busca]);

  useEffect(() => {
    carregarTratamentos();
  }, [carregarTratamentos]);

  const handleChange = (e) => {
    setTratamento({ ...tratamento, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setBusca(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`http://localhost:3001/api/tratamento/${editando}`, tratamento);
        alert('tratamento atualizado com sucesso!');
        setEditando(null);
      } else {
        await axios.post('http://localhost:3001/api/tratamento', tratamento);
        alert('Tratamento cadastrado com sucesso!');
      }
      setTratamento({ codigo: '', nome_tratamento: '' });
      carregarTratamentos();
    } catch (error) {
      console.error('Erro ao salvar tratamento:', error);
    }
  };

  const handleEdit = (tratamento) => {
    setTratamento(tratamento);
    setEditando(tratamento.id_tratamento);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este tratamento?')) {
      try {
        await axios.delete(`http://localhost:3001/api/tratamento/${id}`);
        alert('Tratamento excluído com sucesso!');
        carregarTratamentos();
      } catch (error) {
        console.error('Erro ao excluir tratamento:', error);
      }
    }
  };

  const handlePageChange = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <div className="form-container">
      <h2>{editando ? 'Editar Tratamento' : 'Cadastro de Tratamento'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{display:'none'}}>
          <label>Código:</label>
          <input type="text" name="codigo" value={tratamento.codigo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome_tratamento" value={tratamento.nome_tratamento} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">
          {editando ? 'Atualizar tratamento' : 'Cadastrar tratamento'}
        </button>
      </form>
      <br />
      {/* Campo de busca */}
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <TextField
          label="Pesquisar tratamento"
          type="text"
          value={busca}
          onChange={handleSearchChange}
          fullWidth
        />
      </div>

      <h3>Tratamento Cadastrado</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tratamentos && tratamentos.length > 0 ? (
              tratamentos.map((tratamento) => (
                <TableRow key={tratamento.id_tratamento}>
                  <TableCell>{tratamento.id_tratamento}</TableCell>
                  <TableCell>{tratamento.nome_tratamento}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(tratamento)}
                      startIcon={<EditIcon />}
                    ></Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(tratamento.id_tratamento)}
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum tratamento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          onClick={() => handlePageChange(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          variant="outlined"
          color="primary"
        >
          Anterior
        </Button>
        <span style={{ margin: '0 10px' }}>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <Button
          onClick={() => handlePageChange(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          variant="outlined"
          color="primary"
        >
          Próxima
        </Button>
      </div>
    </div>
  );
};

export default Tratamento;
