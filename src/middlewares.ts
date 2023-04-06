import { Request, Response, NextFunction, query } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from './database';
import { IMovies } from './interface';

export const verifyNameExist = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryString: string = `SELECT * FROM movies;`;

  const queryResult: QueryResult<IMovies> = await client.query(queryString);

  const findIndex = queryResult.rows.findIndex(
    (movies) => movies.name === request.body.name
  );

  if (findIndex !== -1) {
    return response.status(409).json({
      error: 'Movie already registered',
    });
  }

  next();
};

export const verifyIdExist = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = request.params.id;

  const queryString = 'SELECT * FROM movies WHERE id = $1';

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IMovies> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    return response.status(404).json({
      error: 'Movie not found!',
    });
  }

  response.locals.queryResult = queryResult.rows;
  response.locals.idMovie = id;

  return next();
};
