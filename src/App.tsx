import React, { useState } from 'react';
import './App.scss';
import Search, { ISearchResult } from './components/Search/Search';
import List, { IListItem } from './components/List/List';

const App: React.FunctionComponent = () => {
  const [ results, setResults ] = useState(undefined as ISearchResult);

  let items: IListItem[] = [];
  if (results?.data?.results?.length > 0) {
    items = results.data.results.map((item: any): IListItem => {
      let itemObject: IListItem = { id: -1, title: '', /*overview: '',*/ releaseDate: '' };
      
      // TODO create another place to translate stuff
      switch(results.type) {
        case 'movie': 
          itemObject = { id: item.id, title: item.title, /*overview: item.overview,*/ releaseDate: item.release_date }; 
          break;
        case 'tv': 
          itemObject = { id: item.id, title: item.name, /*overview: item.overview,*/ releaseDate: item.first_air_date }; 
          break;
        // case 'game': itemObject = {}; break;
        // case 'anime': itemObject = {}; break;
        default: console.error(`Type ${results.type} is not supported.`); break;
      }
      
      return itemObject;
    });
  }

  return (
    <div className="App">
      <Search onResults={(r: ISearchResult): void => setResults(r) } />
      <List items={items} />
    </div>
  );
};

export default App;
