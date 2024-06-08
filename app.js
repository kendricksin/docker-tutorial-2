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

// Create a new item
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

// Read all items
app.get('/items', (req, res) => {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// Read a single item by ID
app.get('/items/:id', (req, res) => {
  connection.query('SELECT * FROM items WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Item not found');
      return;
    }
    res.json(results[0]);
  });
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const updatedItem = { name: req.body.name };
  connection.query('UPDATE items SET ? WHERE id = ?', [updatedItem, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Item not found');
      return;
    }
    res.json({ id: req.params.id, ...updatedItem });
  });
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  connection.query('DELETE FROM items WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Item not found');
      return;
    }
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
