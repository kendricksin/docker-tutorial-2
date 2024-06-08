const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'example',
  database: 'mydatabase'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/items', (req, res) => {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.post('/items', (req, res) => {
  const newItem = { name: req.body.name };
  connection.query('INSERT INTO items SET ?', newItem, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).json({ id: results.insertId, ...newItem });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
