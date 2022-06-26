import express, {Request, Response} from 'express';
import pool from './connector';
import bodyParser from 'body-parser';
const cors = require('cors');

const app = express();
const port = 8080;

pool.connect()
  .then(() => console.log('DB connection success'))
  .catch(() => console.log('DB connection fail'));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post('/animal', async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  const {name, type} = req.body;
  try {
    const items = await client.query('INSERT INTO animals (name, type) VALUES ($1, $2) RETURNING id, name, type', [name, type]);

    if (items.rows.length === 1) {
      res.status(201).json(items.rows[0]);
    } else {
      throw new Error('');
    }
  } catch {
    res.status(404).send();
  } finally {
    client.release();
  }
})

app.delete('/animal/:id', async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM animals WHERE id=$1', [req.params.id]);
    res.status(204).send();
  } catch {
    res.status(404).send();
  } finally {
    client.release();
  }
})

app.get('/animals', async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  try {
    const items = await client.query('SELECT * FROM animals');
    res.json(items.rows);
  } catch {
    res.status(404).send();
  } finally {
    client.release();
  }
});

app.listen(port, () => console.log(`Started on port: ${port}`));