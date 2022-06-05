import express from 'express';

const app = express();

app.use(express.json());

app.get('/items', (request, response) => {
  response.json([
    {
      id: 1
    },
    {
      id: 2,
    }
  ]);
});

app.listen(8080, () => console.log('Started'));