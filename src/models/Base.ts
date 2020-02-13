export interface ItemBase {
  adult: boolean;
  id: number;
  posterImage: string;
  backdropImage: string;
  title: string;
  description: string;
  popularity: number;
  releaseDate: Date;
  genres: IGenre[]; // genres
  status: string;
}

export interface IGenre {
  id: number;
  name: string;
}
