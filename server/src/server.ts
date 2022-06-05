import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

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

app.listen(port, () => console.log(`Started on port: ${port}`));