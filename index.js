const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3080;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ativback01',
    password: 'ds564',
    port: 7007,
});



function calcularIdade(dataNascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();
    if (mesNascimento > mesAtual || (mesNascimento === mesAtual && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }
  function calcularSigno(mes, dia) {
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
      return 'Aquário';
    } else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) {
      return 'Peixes';
    } else if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
      return 'Áries';
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
      return 'Touro';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
      return 'Gêmeos';
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
      return 'Câncer';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
      return 'Leão';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
      return 'Virgem';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
      return 'Libra';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
      return 'Escorpião';
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
      return 'Sagitário';
    } else {
      return 'Capricórnio'; 
    }
  }








  

  app.use(express.json());

  app.get('/', (req, res) => {
      res.send('A rota está funcionando');
  });
  
  
  app.get('/usuarios', async (req, res) => {
      try {
          const resultado = await pool.query('SELECT * FROM usuarios');
          res.json({
              total: resultado.rowCount,
              usuarios: resultado.rows,
          });
      } catch (error) {
          console.error('Erro ao obter todos os usuarios', error);
          res.status(500).send('Erro ao obter os usuarios');
      }
  });
  
  


   app.post('/usuarios', async (req, res) => {
     try {
       const { nome, email, datanascimento } = req.body;
       const dataNascimento = new Date(datanascimento);
       const idade = calcularIdade(dataNascimento);
       const signo = calcularSigno(dataNascimento.getMonth() + 1, dataNascimento.getDate());

       await pool.query('INSERT INTO usuarios (nome, email, datanascimento, idade, signo) VALUES ($1, $2, $3, $4, $5)', [nome, email, datanascimento, idade, signo]);
       res.status(201).send({ mensagem: 'Usuário adicionado com sucesso!OK'});
     } catch (error) {
       console.error('Erro ao adicionar usuário:', error);
       res.status(500).send('Erro ao adicionar usuário');
     }
   });
  
  
  
  app.delete('/usuarios/:id', async (req, res) => {
      try {
          const {id} = req.params;
          const resultado = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
          res.status(200).send({mensagem: 'usuario deletado com sucesso'})
      } catch (error) {
          console.error('Erro ao apagar usuario', error);
          res.status(500).send('Erro ao apagar o usuario');
      }
  });
  
  
   app.put('/usuarios/:id', async (req, res) => {
       try {
           const { id } = req.params;
           const { nome, email   } = req.body;
          

           await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3', [nome, email, datanascimento, id])
           res.status(200).send({mensagem: 'usuario atualizado com sucesso'})
       } catch (error) {
           console.error('Erro ao atualizar', error);
           res.status(500).send('Erro ao atualizar');
       }
   });
  
  
  app.get('/usuarios/:id', async(req, res) => {
      try {
          const { id } = req. params;
          const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
          if(resultado.rowCount == 0){
              res.status(404).send({mensagem: 'Id não encontrado'});
          }
          res.json({
              usuarios: resultado.rows[0],
          })
      } catch (error) {
          console.error('Erro ao pegar usuario por ID ', error);
          res.status(500).send('Erro ao pegar usuario por ID');
      }
  });
  
  
  
  
  
  app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
  });
  