import { Client } from 'pg';

export const dataMovies = {};

export const client = new Client({
  user: 'vinicius',
  password: '1234',
  host: 'localhost',
  database: 'movies',
  port: 5432,
});

export const startDatabase = async (): Promise<void> => {
  await client.connect();

  console.log('Database connected.');
};
