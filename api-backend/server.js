const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sorriso_pleno'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Função para hash de senha
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Endpoint para cadastro de usuário
app.post('/api/usuarios', async (req, res) => {
  const { login, cpf, nome_completo, data_nascimento, endereco, email, celular, contato_emergencia, nome_contato_emergencia, senha } = req.body;

  try {
    const hashedPassword = await hashPassword(senha);
    const query = 'INSERT INTO usuario (login, cpf, nome_completo, data_nascimento, endereco,  email, celular, contato_emergencia, nome_contato_emergencia, senha) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [login, cpf, nome_completo, data_nascimento, endereco, email, celular, contato_emergencia, nome_contato_emergencia, hashedPassword], (err, result) => {
      if (err) throw err;
      res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
    });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao cadastrar o usuário.' });
  }
});

// Endpoint para login de usuário
app.post('/api/usuarios/login', (req, res) => {
  const { login, senha } = req.body;
  const query = 'SELECT * FROM usuario WHERE login = ?';

  db.query(query, [login], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(401).send({ message: 'Usuário não encontrado.' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(senha, user.senha);

    if (passwordMatch) {
      res.send({ message: 'Login realizado com sucesso!', user: { id: user.id, nome: user.nome, email: user.email } });
    } else {
      res.status(401).send({ message: 'Senha incorreta.' });
    }
  });
});
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM usuario WHERE login = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send({ error: 'Erro no servidor' });

    if (results.length === 0) {
      return res.status(401).send({ error: 'Usuário não encontrado' });
    }

    const user = results[0];

    // Comparando senha usando bcrypt se estiver usando hash
    bcrypt.compare(password, user.senha, (err, isMatch) => {
      if (err) return res.status(500).send({ error: 'Erro ao verificar a senha' });

      if (!isMatch) {
        return res.status(401).send({ error: 'Senha incorreta' });
      }

      res.status(200).send({ message: 'Login bem-sucedido', user });
    });
  });
});
// Endpoints para Clientes
app.post('/api/clientes', (req, res) => {
  const { nome, email, telefone, dataNascimento } = req.body;
  const query = 'INSERT INTO clientes (nome, email, telefone, dataNascimento) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, email, telefone, dataNascimento], (err, result) => {
    if (err) throw err;
    res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
  });
});

app.get('/api/clientes', (req, res) => {
  const query = 'SELECT * FROM clientes';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});



// Endpoints para Tratamento
// app.post('/api/tratamento', (req, res) => {
//   const { nome_tratamento} = req.body;
//   const query = 'INSERT INTO tratamento (nome_tratamento) VALUES ( ?)';
//   db.query(query, [nome_tratamento], (err, result) => {
//     if (err) throw err;
//     res.status(201).send({ message: 'tratamento cadastrado com sucesso!' });
//   });
// });

// app.get('/api/tratamento', (req, res) => {
//   const query = 'SELECT * FROM tratamento';
//   db.query(query, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// Atualiza pedido
app.put('/api/tratamento/:id', (req, res) => {
  const idtratamento = req.params.id;
  const { id_tratamento, nome_tratamento } = req.body;

  const queryUpdateTratamento = 'UPDATE tratamento SET nome_tratamento = ? WHERE id_tratamento = ?';

  db.beginTransaction((err) => {
    if (err) throw err;

    // Atualiza o pedido principal
    db.query(queryUpdateTratamento, [nome_tratamento, id_tratamento], (err, result) => {
      if (err) return db.rollback(() => { throw err; });

      db.commit((err) => {
        if (err) return db.rollback(() => { throw err; });
        res.status(200).send({ message: 'Tratamento atualizado com sucesso!' });
      });
    });
  });
});

app.delete('/api/tratamento/:id', (req, res) => {
  const idtratamento = req.params.id;

  // SQL para deletar o pedido
  const query = 'DELETE FROM tratamento WHERE id_tratamento = ?';

  // Executa a query de exclusão
  db.query(query, [idtratamento], (err, result) => {
    if (err) {
      console.error("Erro ao excluir o tratamento:", err);
      return res.status(500).send({ message: "Erro ao excluir o tratamento." });
    }

    if (result.affectedRows === 0) {
      // Caso nenhum pedido tenha sido encontrado
      return res.status(404).send({ message: "tratamento não encontrado." });
    }

    // Retorna sucesso com uma mensagem
    res.status(200).send({ message: "tratamento excluído com sucesso!" });
  });
});

// Endpoints para tratamento
app.post('/api/tratamento', (req, res) => {
  const { nome_tratamento } = req.body;
  const query = 'INSERT INTO tratamento (nome_tratamento) VALUES (?)';
  db.query(query, [nome_tratamento], (err, result) => {
    if (err) throw err;
    res.status(201).send({ message: 'Tratamento cadastrado com sucesso!' });
  });
});

// Função para carregar tratamentos com paginação e busca
app.get('/api/tratamento', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  const offset = (page - 1) * limit;

  // Construindo a consulta SQL com paginação e busca
  const sqlCount = `SELECT COUNT(*) AS total FROM tratamento WHERE nome_tratamento LIKE ?`;
  const sqlSelect = `SELECT * FROM tratamento WHERE nome_tratamento LIKE ? LIMIT ? OFFSET ?`;

  db.query(sqlCount, [`%${search}%`], (err, countResult) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao contar tratamentos.');
    }

    const totalTratamentos = countResult[0].total;
    const totalPages = Math.ceil(totalTratamentos / limit);

    db.query(sqlSelect, [`%${search}%`, limit, offset], (err, tratamentos) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao carregar tratamentos.');
      }

      res.json({
        tratamentos: tratamentos,
        totalPages: totalPages,
      });
    });
  });
});



// Endpoints para Consulta
app.post('/api/consulta', (req, res) => {
  const { descricao, data_consulta, id_tratamento } = req.body;
  const query = 'INSERT INTO consulta (descricao, data_consulta, id_tratamento) VALUES ( ?, ?, ,?)';
  db.query(query, [descricao, data_consulta, id_tratamento], (err, result) => {
    if (err) throw err;
    res.status(201).send({ message: 'consulta cadastrada com sucesso!' });
  });
});

app.get('/api/consulta', (req, res) => {
  const query = 'SELECT * FROM consulta';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Endpoints para Agendamento
app.post('/api/agendamento', (req, res) => {
  const { data_horario, id_usuario, descricao, id_tratamento, id_consulta, id_cliente } = req.body;
  const queryAgendamento = 'INSERT INTO agendamento (data_horario, id_usuario, descricao, id_tratamento, id_consulta, id_cliente) VALUES (?, ?, ?, ?, ?, ?)';

  db.beginTransaction((err) => {
    if (err) throw err;

    db.query(queryAgendamento, [data_horario, id_usuario, descricao, id_tratamento, id_consulta, id_cliente], (err, result) => {
      if (err) return db.rollback(() => { throw err; });



      const id_agendamento = result.insertId;
      const queryAgendamento = 'INSERT INTO agendamento (data_horario, id_usuario, descricao, id_tratamento, id_consulta, id_cliente) VALUES (?, ?, ?, ?, ?, ?)';
      const itensValues = itens.map((item) => [data_horario, id_usuario, descricao, id_tratamento, id_consulta, id_cliente]);

      db.query(queryItem, [itensValues], (err) => {
        if (err) return db.rollback(() => { throw err; });
        db.commit((err) => {
          if (err) return db.rollback(() => { throw err; });
          res.status(201).send({ message: 'Agendamento cadastrado com sucesso!' });
        });
      });
    });
  });
});

app.get('/api/agendamento', (req, res) => {
  const query = `
    SELECT agendamento.id, agendamento.data_horario, agendamento.id_usuario, agendamento.descricao, clientes.nome as clientes
    FROM pedidos
    JOIN agendamento ON agendamento.clientesId = clientes.id
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});