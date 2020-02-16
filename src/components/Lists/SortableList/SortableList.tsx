import React, { useState, useEffect } from 'react';
import './SortableList.scss';
import ListItem, { IListItem } from '../ListItem/ListItem';
import Sort from './Sort/Sort';

export interface ISortableListProps {
  items: IListItem[];
}

export const SortableList: React.FunctionComponent<ISortableListProps> = (props: ISortableListProps) => {
  const [ items, setItems ] = useState(new Array<any>());
  const [ sortBy, setSortBy ] = useState('title');
  useEffect(() => { setItems(props.items); }, [props.items]);

  let keys: string[] = new Array<string>();
  if (items?.length > 0) {
    keys = Object.keys(items[0]);
  }
  
  return (
    <div className='SortableListComponent'>
      {keys?.length > 0 && (
        <select 
          onChange={(event: any) => setSortBy(event.target.value)} 
          value={sortBy}
        >
          {keys.map((key: string, index: number) => { 
            return <option key={index} value={key}>{key}</option>; 
          })}
        </select>
      )}
      {sortBy !== '' ? (
        <Sort items={items} sortBy={sortBy} />
      ) : (
        items?.length > 0 && items.map((item: IListItem, index: number) => { 
          return <ListItem key={index} {...item} />; 
        })
      )}
    </div>
  );
};

export default SortableList;