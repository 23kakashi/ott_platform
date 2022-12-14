export interface MovieType {
  title: string;
  release_date: Date;
  rating: number;
  language: string;
  plan: string;
  url: string;
}

export interface MovieCastType {
  movie_id: string;
  actor: string;
}
export interface MovieDirectorType {
  movie_id: string;
  director_name: string;
}
export interface MovieGenerType {
  movie_id: string;
  genres: string;
}

export interface MovieDataType extends MovieType {
  cast: string[];
  directors: string[];
  geners: string[];
}
