import React, { useState } from 'react';
import './App.scss';
import Search, { ISearchResult } from './components/Search/Search';
import SortableList from './components/Lists/SortableList/SortableList';
import { IListItem } from './components/Lists/ListItem/ListItem';

const App: React.FunctionComponent = () => {
  const [ results, setResults ] = useState(undefined as ISearchResult);

  let items: IListItem[] = new Array<IListItem>();
  if (results?.data?.results?.length > 0) {
    items = results.data.results.map((item: any): IListItem => {
      return { mediaType: results.type, id: item.id, title: item.title, releaseDate: item.release_date };
    });
  }

  return (
    <div className="App">
      <Search onResults={(r: ISearchResult): void => setResults(r) } />
      <SortableList items={items} />
    </div>
  );
};

export default App;
