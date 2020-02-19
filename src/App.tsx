import React, { useState } from 'react';
import './App.scss';
import Search, { ISearchResult } from './components/Search/Search';
import SortableList from './components/Lists/SortableList/SortableList';
import { getListItem } from '../src/components/Lists/functions/Lists';
import { IListColumn, IListItem } from './components/Lists/interfaces/Lists';

const App: React.FunctionComponent = () => {
  const [ results, setResults ] = useState(undefined as ISearchResult);

  let items: IListItem[] = new Array<IListItem>();
  if (results?.data?.results?.length > 0) {
    items = results.data.results.map((item: any): IListItem => {
      return getListItem(item, results.type);
    });
  }

  let keys: IListColumn[] = new Array<IListColumn>();
  if (items?.length > 0) {
    keys = Object.keys(items[0]).map((key: string): IListColumn => {
      return { field: key, width: (100 / keys.length), show: true };
    });
  }

  return (
    <div className="App">
      <Search onResults={(r: ISearchResult): void => setResults(r) } />
      <SortableList columns={keys} label='Sort by' showExternalLabel={false} items={items} />
    </div>
  );
};

export default App;
