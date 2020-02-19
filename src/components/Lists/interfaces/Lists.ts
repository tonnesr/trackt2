export interface IListColumn {
  width: number; // maybe change to string? So that we can have px/%.
  field: string;
  show: boolean;
}

export interface IListItem {
  mediaType: string;
  id: number;
  title: string;
  releaseDate: Date;
}