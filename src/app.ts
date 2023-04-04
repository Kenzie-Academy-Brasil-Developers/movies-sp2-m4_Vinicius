import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/films', (request: Request, response: Response): Response => {
  return response.status(200).json({
    message: 'Filmes capturados',
  });
});

app.post('/films', (request: Request, response: Response): Response => {
  return response.status(201).json({
    message: 'Filme postado',
  });
});

app.delete('/films', (request: Request, response: Response): Response => {
  return response.status(204).json({
    message: 'Filme deletado',
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is runnig in localhost:${port}`);
});
