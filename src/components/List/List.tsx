import React from 'react';

export interface IListItem {
  id: number;
  title: string;
  overview: string;
  releaseDate: string; // date?
  // +
}

export interface IListProps {
  //maxVisibleItems: number; // max number of items in view?
  items: IListItem[];
}

export const List: React.FunctionComponent<IListProps> = (props: IListProps) => {
  // Translate to list with columns, so we can sort and stuffs.
  // Sort data in background, not in the table/list thingy?
  
  const items: JSX.Element[] = props.items.map((item: IListItem) => {
    return (<div className='ListItem' key={item.id} >{item && item.title}</div>);
  });
  
  return (
    <div className='ListComponent'>
      {items && items}
    </div>
  );
}

export default List;