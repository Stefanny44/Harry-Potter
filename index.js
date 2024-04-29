const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3090;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harrypotter',
    password: 'ds564',
    port: 7007,
});







  app.use(express.json());



  // get rota funfando

  app.get('/', (req, res) => {
      res.send('A rota está funcionando');
  });

  app.get('/', (req, res) => {
    res.send('A rota está funcionando!!!');
});

  


 //get rota
  
  app.get('/bruxo', async (req, res) => {
      try {
          const resultado = await pool.query('SELECT * FROM bruxo');
          res.json({
              total: resultado.rowCount,
              bruxo: resultado.rows,
          });
      } catch (error) {
          console.error('Erro ao obter todos os bruxos', error);
          res.status(500).send('Erro ao obter os bruxos cadastrados');
      }
  });

  app.get('/varinha', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM varinha');
        res.json({
            total: resultado.rowCount,
            varinha: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todos as varinhas', error);
        res.status(500).send('Erro ao obter as varinhas');
    }
});
  





  

// post

   app.post('/bruxo', async (req, res) => {
     try {
       const { nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
       let casas = ["Grifinória", "Corvinal", "Sonserina", "Lufa-Lufa"];
       let sangue = ["Sangue puro", "Mestiço", "Trouxa"]

       if (!casas.includes(casa_hogwarts )) {
        res.status(500).send('A casa precisa ser: Grifinória, Corvinal, Sonserina ou Lufa-Lufa');
       } else if (!sangue.includes(status_sangue)){
        res.status(500).send('O sangue precisa ser: Sangue puro, Mestiço ou Trouxa');
       } else {
        await pool.query('INSERT INTO bruxo (nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono]);
        res.status(201).send({ mensagem: 'Bruxo adicionado com sucesso!OK'});
       }
       
       
     } catch (error) {
       console.error('Erro ao adicionar bruxo:', error);
       res.status(500).send('Erro ao adicionar bruxo');
     }
   });

   app.post('/varinha', async (req, res) => {
    try {
      const { material, comprimento, nucleo, data_fabricacao} = req.body;
     
      await pool.query('INSERT INTO varinha (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
      res.status(201).send({ mensagem: 'Varinha adicionado com sucesso!OK'});
    } catch (error) {
      console.error('Erro ao adicionar varinha:', error);
      res.status(500).send('Erro ao adicionar varinha');
    }
  });



  
  
  // DELETE
  app.delete('/bruxo/:id', async (req, res) => {
      try {
          const {id} = req.params;
          const resultado = await pool.query('DELETE FROM bruxo WHERE id = $1', [id]);
          res.status(200).send({mensagem: 'bruxo deletado com sucesso'})
      } catch (error) {
          console.error('Erro ao deletar bruxo', error);
          res.status(500).send('Erro ao deletar o bruxo');
      }
  });

  app.delete('/varinha/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await pool.query('DELETE FROM varinha WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'varinha deletada com sucesso'})
    } catch (error) {
        console.error('Erro ao deletar a varinha', error);
        res.status(500).send('Erro ao deletar a varinha');
    }
});






  
  // put por id
   app.put('/bruxo/:id', async (req, res) => {
       try {
           const { id } = req.params;
           const { nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono   } = req.body;
           let casas = ["Grifinória", "Corvinal", "Sonserina", "Lufa-Lufa"];
           let sangue = ["Sangue puro", "Mestiço", "Trouxa"]
    
           if (!casas.includes(casa_hogwarts )) {
            res.status(500).send('A casa precisa ser: Grifinória, Corvinal, Sonserina ou Lufa-Lufa');
           } else if (!sangue.includes(status_sangue)){
            res.status(500).send('O sangue precisa ser: Sangue puro, Mestiço ou Trouxa');
           } else {
            await pool.query('UPDATE bruxo SET nome = $1, idade = $2, casa_hogwarts = $3, habilidade_especial = $4, status_sangue = $5, patrono = $6 WHERE id = $7', [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono, id])
            res.status(200).send({mensagem: 'bruxo atualizado com sucesso'})
           }

           
       } catch (error) {
           console.error('Erro ao atualizar bruxo', error);
           res.status(500).send('Erro ao atualizar bruxo');
       }
   });

   app.put('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_fabricacao   } = req.body;
       

        await pool.query('UPDATE bruxo SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, data_fabricacao, id])
        res.status(200).send({mensagem: 'varinha atualizada com sucesso'})
    } catch (error) {
        console.error('Erro ao atualizar varinha', error);
        res.status(500).send('Erro ao atualizar varinha');
    }
});
  






  // get por id
  app.get('/bruxo/:id', async(req, res) => {
      try {
          const { id } = req. params;
          const resultado = await pool.query('SELECT * FROM bruxo WHERE id = $1', [id])
          if(resultado.rowCount == 0){
              res.status(404).send({mensagem: 'Id não encontrado'});
          }
          res.json({
              bruxo: resultado.rows[0],
          })
      } catch (error) {
          console.error('Erro ao pegar bruxo por ID ', error);
          res.status(500).send('Erro ao pegar bruxo por ID');
      }
  });

  app.get('/varinha/:id', async(req, res) => {
    try {
        const { id } = req. params;
        const resultado = await pool.query('SELECT * FROM varinha WHERE id = $1', [id])
        if(resultado.rowCount == 0){
            res.status(404).send({mensagem: 'Id não encontrado'});
        }
        res.json({
            varinha: resultado.rows[0],
        })
    } catch (error) {
        console.error('Erro ao pegar varinha por ID ', error);
        res.status(500).send('Erro ao pegar varinha por ID');
    }
});
  
  
  






  
  
  app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
  });
  