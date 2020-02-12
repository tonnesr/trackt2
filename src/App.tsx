import React, { useState } from 'react';
import './App.scss';
import Search, { ISearchResult } from './components/Search/Search';
import List, { IListItem } from './components/List/List';

const App: React.FunctionComponent = () => {
  const [ results, setResults ] = useState(undefined as ISearchResult);
  
  let items: IListItem[] = [];
  if (results && results.response && results.response.results) {
    items = results.response.results.map((item: any): IListItem => {
      if (item) return { id: item.id, title: item.title, overview: item.overview, releaseDate: item.release_date };
      return null;
    });
  }

  return (
    <div className="App">
      <Search onResults={(results): void => setResults(results) } />
      <List items={items} />
    </div>
  );
}

export default App;
