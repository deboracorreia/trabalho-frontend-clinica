// import React, { useState } from 'react';
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';


// const Tratamento = () => {
//   const [tratamento, setTratamento] = useState({
//     nome_tratamento: '',
//   });

//   const handleChange = (e) => {
//     setTratamento({ ...tratamento, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/api/tratamento', tratamento);
//       alert('tratamento cadastrado com sucesso!');
//       setTratamento({
//         nome_tratamento: '',
//       });
//     } catch (error) {
//       console.error('Erro ao tratamento cliente:', error);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Cadastro de tratamento</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Nome do Tratamento:</label>
//           <input type="text" name="nome_tratamento" value={tratamento.nome_tratamento} onChange={handleChange} required />
//         </div>
//         <button type="submit" className="button">Cadastrar tratamento</button>
//       </form>
//     </div>
//   );
// };

// export default Tratamento;
