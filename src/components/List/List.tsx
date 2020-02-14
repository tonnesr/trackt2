import React, { useState, useEffect } from 'react';

export interface IListItem {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
}

export interface IListProps {
  //maxVisibleItems: number; // max number of items in view?
  items: IListItem[];
}

export const List: React.FunctionComponent<IListProps> = (props: IListProps) => {
  const [ items, setItems ] = useState(new Array<IListItem>());
  const [ sorted, setSorted ] = useState(false);
  useEffect(() => { setItems(props.items); }, [props.items]);
  useEffect(() => { 
    if (items) {
      if (!sorted) {
        setItems(props.items) 
      } else {
        setItems([...props.items].sort((a, b) => { return a.title && b.title ? a.title.localeCompare(b.title) : 0; })) 
      }
    }
  }, [sorted]); // TODO Warning from react (useReducer)

  return (
    <div className='ListComponent'>
      <button onClick={() => { setSorted(prevSorted => !prevSorted) }}>Sort</button>
      <table>
        <tbody className='ListItemContainer'>
          {items && renderTable(items)}
        </tbody>
      </table>
    </div>
  );
}

function renderTable(items: IListItem[]){
  if (items.length > 0) {
    const tableHeaders: string[] = Object.keys(items[0]);
    const tableContent: JSX.Element[] = items.map((item: IListItem) => { 
      return (
        <tr className='ListItemRow' key={item.id}>
          <td className='ListItemId'>{item.id}</td>
          <td className='ListItemTitle'>{item.title}</td>
          <td className='ListItemOverview' title={item.overview}>overview</td>
          <td className='ListItemReleaseDate'>{item.releaseDate}</td>
        </tr>
      )
    });

    return ( // TODO sorting by x
      <>
        <tr>
          {tableHeaders.map((item, index) => { return <th key={index} onClick={() => console.log('sorting by', item)}>{item.toUpperCase()}</th> })}
        </tr>
        {tableContent}
      </>
    );
  }
}

export default List;