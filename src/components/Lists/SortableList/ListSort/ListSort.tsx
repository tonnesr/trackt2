import React from 'react';
import { ListItem } from '../../ListItem/ListItem';
import './ListSort.scss';
import { IListColumn, IListItem } from '../../interfaces/Lists';

interface ISortProps {
  items: IListItem[];
  sortBy: IListColumn;
  columns: IListColumn[];
}

export const ListSort: React.FunctionComponent<ISortProps> = (props: ISortProps) => {
  const { items, sortBy, columns } = props;
  const sortByField: string = sortBy?.field;

  const sortedItems: IListItem[] = items.sort((a, b): number => {
    if (a && b) {
      switch(typeof a[sortByField]) {
        case 'number':
          return a[sortByField] > b[sortByField] ? 1 : -1;
        default:
          return (`${a[sortByField]}`).localeCompare(`${b[sortByField]}`);
      }
    } else {
      return 0;
    }
  });

  return (
    <>
      {sortedItems.map((item: IListItem, index: number) => { 
        return <ListItem key={index} values={item} columns={columns} />; 
      })}
    </>
  );
};

export default ListSort;