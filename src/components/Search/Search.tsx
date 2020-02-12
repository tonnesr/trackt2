import './Search.scss';
import React, { useState } from 'react';
import MovieDBClient from '../../functions/helpers/MovieDBHelper';

export interface ISearchResult {
  type: string;
  query: string;
  response: {
    page?: number;
    total_results?: number;
    total_pages?: number;
    results?: {}[];
  };
}

export interface ISearchProps {
  onResults(result: ISearchResult): void;
  onChange?(): void;
}

export const Search: React.FunctionComponent<ISearchProps> = (props: ISearchProps) => {
  const [ query, setQuery ] = useState('');
  const [ type, setType ] = useState('movie');
  
  const getResults = async (event: any): Promise<any> => {
    event.preventDefault();

    let res: ISearchResult = { type: 'none', query: '', response: {} };

    switch(type) {
      case 'tv': 
      case 'movie':
        const client = new MovieDBClient();
        const response = await client.searchMedia(type, query, 1);
        res = { type, query, response };
        break;
      case 'game': 
      case 'anime': //case 'people':
      default: 
        console.error(`${type} type not yet supported`); 
        break;
    }

    props.onResults(res);
  }

  return (
    <div className='SearchComponent'>
      <form onSubmit={(event) => { getResults(event) }}>
        <input type='text' onChange={(event: any) => { setQuery(event.target.value) }} />
      </form>
      <select value={type} onChange={(event) => { setType(event.target.value) }}>
        <option value='movie'>Movie</option>
        <option value='tv'>Tv</option>
        <option value='game'>Game</option>
        <option value='anime'>Anime</option>
      </select>
    </div>
  );
}

export default Search;