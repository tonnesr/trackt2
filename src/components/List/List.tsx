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

  // FIXME some list is missing unique keys. Browsers return warnings.

  return (
    <div className='ListComponent'>
      {items && (
        <>
          <button onClick={() => { setSorted(prevSorted => !prevSorted) }}>Sort</button>
          <table>
            <tbody className='ListItemContainer'>
              {renderTable(items)}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

function renderTable(items: IListItem[]): JSX.Element {
  if (items.length > 0) {
    const tableHeaders: string[] = Object.keys(items[0]);
    const tableContent: JSX.Element[] = items.map((item: IListItem) => { 
      return (
        <tr className='ListItemRow' key={item.id}>
          {tableHeaders.map((key: string): JSX.Element => {
            const currItem: any = item[key];
            return <td className={`ListItem${currItem}`}>{currItem}</td>
          })}
        </tr>
      )
    });

    return (
      <>
        <tr>
          {tableHeaders.map((key: string, index: number) => { return <th key={index} onClick={() => console.log('sorting by', key)}>{key.toUpperCase()}</th> })}
        </tr>
        {tableContent}
      </>
    );
  }
}

export default List;