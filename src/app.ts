import express from 'express';
import { startDatabase } from './database';
import {
  createMovies,
  deleteMovie,
  editMovie,
  getMovies,
  getMoviesById,
} from './logic';
import { verifyIdExist, verifyNameExist } from './middlewares';

const app = express();

app.use(express.json());

app.post('/movies', verifyNameExist, createMovies);
app.get('/movies', getMovies);
app.get('/movies/:id', verifyIdExist, getMoviesById);
app.patch('/movies/:id', verifyIdExist, verifyNameExist, editMovie);
app.delete('/movies/:id', verifyIdExist, deleteMovie);

const port = 3000;

app.listen(port, async () => {
  await startDatabase();

  console.log(`Server is runnig in localhost:${port}`);
});
