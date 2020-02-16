import React from 'react';
import { ListItem, IListItem } from '../../ListItem/ListItem';
import './ListSort.scss';

interface ISortProps {
  items: IListItem[];
  sortBy: string;
}

export const ListSort: React.FunctionComponent<ISortProps> = (props: ISortProps) => {
  const { items, sortBy } = props;

  const sortedItems: IListItem[] = items.sort((a, b): number => {
    if (a && b) {
      switch(typeof a[sortBy]) {
        case 'number':
          return a[sortBy] > b[sortBy] ? 1 : -1;
        default:
          return (`${a[sortBy]}`).localeCompare(`${b[sortBy]}`);
      }
    } else {
      return 0;
    }
  });

  return (
    <>
      {sortedItems.map((item: IListItem, index: number) => { 
        return <ListItem key={index} {...item} />; 
      })}
    </>
  );
};

export default ListSort;