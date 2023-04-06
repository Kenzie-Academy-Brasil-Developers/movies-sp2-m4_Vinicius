/* Captura todos os filmes. */

SELECT * FROM movies;

/* Captura os filmes pelo ID. */

SELECT * FROM movies WHERE id = $1;

/* Adiciona filmes. */

INSERT INTO movies
  (%I)
VALUES
  (%L)
RETURNING *;

/* Atualiza um filme. (Precisa do ID) */

UPDATE movies
  SET 
    (%I) = ROW(%L)
  WHERE 
    id = $1
RETURNING *;

/* Deleta um filme. (Precisa de ID) */

DELETE FROM movies
  WHERE
    id = $1;