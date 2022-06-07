import express from 'express';
import pool from './connector';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

pool.connect()
  .then(() => console.log('DB connection success'))
  .catch(() => console.log('DB connection fail'));

app.use(express.json());
app.use(bodyParser.json());

app.post('/object', async (req, res) => {
  const client = await pool.connect();
  const {name, type} = req.body;
  try {
    await client.query('INSERT INTO objects (name, type) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM objects WHERE name=$3)', [name, type, name]);
    res.status(201).send();
  } catch {
    res.status(404).send();
  } finally {
    client.release();
  }
})

app.delete('/object/:name', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM objects WHERE name=$1', [req.params.name]);
    res.status(204).send();
  } catch {
    res.status(404).send();
  } finally {
    client.release();
  }
})

app.get('/objects', async (req, res) => {
  const client = await pool.connect();
  try {
    const items = await client.query('SELECT * FROM objects');
    res.json(items.rows);
  } catch {
    res.status(404).send();
  } finally {
    client.release();
  }
});

app.listen(port, () => console.log(`Started on port: ${port}`));