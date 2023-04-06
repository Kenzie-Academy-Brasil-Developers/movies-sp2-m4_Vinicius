/* Captura todos os filmes. */

SELECT * FROM movies;

/* Captura os filmes pelo ID. */

SELECT * FROM movies WHERE id = 1;

/* Adiciona filmes. */

INSERT INTO movies
  "name", "category", "duration", "price"
VALUES
  'Divertidamente', 'Animação', 120, 35
RETURNING *;

/* Atualiza um filme. (Precisa do ID) */

UPDATE movies
  SET 
    "name" = 'Divertidamente 2'
  WHERE 
    id = 1
RETURNING *;

/* Deleta um filme. (Precisa de ID) */

DELETE FROM movies
  WHERE
    id = 1;