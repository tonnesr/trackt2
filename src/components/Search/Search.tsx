import './Search.scss';
import React, { useState } from 'react';
import MovieDBClient from '../../functions/helpers/MovieDBHelper';

export interface ISearchResult {
  type: string;
  query: string;
  data: {
    page?: number;
    total_results?: number;
    total_pages?: number;
    results?: any[];
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
    let res = await onSearch(query, type);
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

async function onSearch(query: string, type: string): Promise<ISearchResult> {
  let client; 
  let data;
  
  switch(type) {
    case 'movie':
    case 'tv':
      client = new MovieDBClient();
      data = await client.searchMedia(type, query, 1);
      break;
    case 'game':
    case 'anime':
      console.log(`Game and anime search is not yet supported.`);
      break;
    default:
      console.error(`Type search for ${type} is not supported.`);
      break;
  }
  return { type, query, data };
}

export default Search;