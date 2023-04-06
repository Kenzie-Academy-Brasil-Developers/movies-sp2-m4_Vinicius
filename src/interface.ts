export interface IMovies {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type TMoviesRequest = Omit<IMovies, 'id'>;
