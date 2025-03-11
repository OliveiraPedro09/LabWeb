let express = require('express');
let app = express();

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./empresa.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS funcionarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    endereco TEXT,
    telefone TEXT,
    email TEXT
)`);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', function (req, res) {
  res.send("<html><head><title>Programa NodeJS</title></head>\
  <body>Página HTML</body></html>");
});

app.get('/cadastro', function (req, res) {
  var html = `<html><head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></head><body>
    <form action="/dados" method="post">
    <label>Nome: <input type="text" name="nome"></label><br>
    <label>Endereço:<input type="text" name="endereco"></label><br>
    <label>Telefone: <input type="text" name="telefone"></label><br>
    <label>Email: <input type="text" name="email"></label><br>
    <button class="btn-primary" type="submit">Enviar</button>
    </form>
    </body></html>`;
  res.send(html);
});

app.get('/consulta', function (req, res) {
  db.all('SELECT * FROM funcionarios', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows); 
  });
});

app.post('/dados', function (req, res) {
  var nome = req.body.nome;
  var endereco = req.body.endereco;
  var telefone = req.body.telefone;
  var email = req.body.email;

  db.run(`INSERT INTO funcionarios (nome, endereco, telefone, email) VALUES (?, ?, ?, ?)`, [nome, endereco, telefone, email], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("Um registro inserido");
  });

  res.send("Nome: " + nome + "<br>Endereço: " + endereco + "<br>Telefone: " + telefone + "<br>Email: " + email);
});

app.put('/dados/:id', function (req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var endereco = req.body.endereco;
  var telefone = req.body.telefone;
  var email = req.body.email;

  db.run(`UPDATE funcionarios SET nome = ?, endereco = ?, telefone = ?, email = ? WHERE id = ?`, [nome, endereco, telefone, email, id], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Registro com ID ${id} atualizado`);
    res.send(`Registro com ID ${id} atualizado`);
  });
});

app.delete('/dados/:id', function (req, res) {
  var id = req.params.id;

  db.run(`DELETE FROM funcionarios WHERE id = ?`, id, function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Registro com ID ${id} deletado`);
    res.send(`Registro com ID ${id} deletado`);
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Erro 404! Página não encontrada!!!");
});

app.listen(3000, function () {
  console.log('Servidor ouvindo na porta 3000');
});