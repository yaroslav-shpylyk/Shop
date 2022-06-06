import express from 'express';
import pool from './connector';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8080;

pool.connect()
  .then(() => console.log('DB connected'))
  .catch(() => console.log('Failed to connect DB'));

app.use(express.json());
app.use(bodyParser.json());

app.post('/object', async (req, res) => {
  const client = await pool.connect();
  const {name, type} = req.body;
  await client.query('INSERT INTO objects (name, type) VALUES ($1, $2)', [name, type]);
  client.release();
  res.status(201).send();
})

app.get('/objects', async (req, res) => {
  const client = await pool.connect();
  const items = await client.query('SELECT * FROM objects');
  client.release();
  res.json(items.rows);
});

app.listen(port, () => console.log(`Started on port: ${port}`));