import { Response, Request } from 'express';
import { client } from './database';
import { QueryConfig, QueryResult } from 'pg';
import { IMovies, TMoviesRequest } from './interface';
import format from 'pg-format';

export const createMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieRequest: TMoviesRequest = request.body;

  const queryString: string = format(
    `
  INSERT INTO movies
    (%I)
  VALUES
    (%L)
  RETURNING *;
`,
    Object.keys(movieRequest),
    Object.values(movieRequest)
  );

  const queryResult: QueryResult<IMovies> = await client.query(queryString);

  return response.status(201).json(queryResult.rows[0]);
};

export const getMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const queryFilter = request.query;

  const queryString: string = `SELECT * FROM movies;`;

  const queryResult: QueryResult<IMovies> = await client.query(queryString);

  const movieResponseFilter = queryResult.rows.filter(
    (movie) => movie.category === queryFilter.category
  );

  if (movieResponseFilter.length !== 0) {
    return response.status(200).json(movieResponseFilter);
  }

  return response.status(200).json(queryResult.rows);
};

export const getMoviesById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const queryResult = response.locals.queryResult;

  return response.status(200).json(queryResult[0]);
};

export const editMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = response.locals.idMovie;
  const movieEditRequest = request.body;

  const queryString = format(
    `
    UPDATE movies
    SET 
      (%I) = ROW(%L)
    WHERE 
      id = $1
    RETURNING *;
  `,
    Object.keys(movieEditRequest),
    Object.values(movieEditRequest)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  console.log(queryResult);

  return response.status(200).json(queryResult.rows[0]);
};

export const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = response.locals.idMovie;

  const queryString = `
  DELETE FROM movies
    WHERE
      id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  console.log(queryConfig);

  const queryResult: QueryResult = await client.query(queryConfig);

  return response.status(204).send();
};
