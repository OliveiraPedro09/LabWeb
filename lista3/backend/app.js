const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());

const db = new sqlite3.Database('usuarios.db', (err) => {
   if (err) {
      console.error(err.message);
   }
   console.log('Conectado ao banco de dados usuarios.db');
});

db.serialize(() => {
   db.run("CREATE TABLE if not exists usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, telefone TEXT)");
});

app.post('/usuarios', (req, res) => {
   const { nome, telefone } = req.body;
   db.run("INSERT INTO usuarios (nome, telefone) VALUES (?, ?)", [nome, telefone], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nome, telefone });
   });
});

app.get('/usuarios', (req, res) => {
   db.all("SELECT * FROM usuarios", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
   });
});

app.get('/usuarios/:id', (req, res) => {
   const { id } = req.params;
   db.get("SELECT * FROM usuarios WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
   });
});

app.put('/usuarios/:id', (req, res) => {
   const { id } = req.params;
   const { nome, telefone } = req.body;
   db.run("UPDATE usuarios SET nome = ?, telefone = ? WHERE id = ?", [nome, telefone, id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuário atualizado com sucesso' });
   });
});

app.delete('/usuarios/:id', (req, res) => {
   const { id } = req.params;
   db.run("DELETE FROM usuarios WHERE id = ?", id, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuário deletado com sucesso' });
   });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
