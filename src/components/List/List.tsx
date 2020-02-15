import React, { useState, useEffect } from 'react';
import './List.scss';

export interface IListItem {
  id: number;
  title: string;
  //overview: string;
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
        setItems(props.items);
      } else {
        setItems([...sortTable(props.items, 'title')]);
      }
    }
  }, [sorted]); // TODO Warning from react (useReducer)

  // FIXME some list is missing unique keys. Browsers return warnings.

  return (
    <div className='ListComponent'>
      {items && (
        <>
          <button onClick={() => { setSorted(prevSorted => !prevSorted); }}>Sort</button>
          <table className='ListItemContainer'>
            <tbody>
              {renderTable(items)}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

// FIXME broken, doesn't sort or something
function sortTable(items: IListItem[], sortByKey: string): IListItem[] {
  return items.sort((a, b) => { 
    return a[sortByKey] && b[sortByKey ? a[sortByKey].localeCompare(b[sortByKey]): 0];
  });
}

/**
 * TODO Sort inside of this function
 * 
 * @param items 
 */
function renderTable(items: IListItem[]): JSX.Element {
  if (items.length > 0) {
    const tableHeaders: string[] = Object.keys(items[0]);
    const tableContent: JSX.Element[] = items.map((item: IListItem) => { 
      return (
        <tr className='ListItemRow' key={item.id}>
          {tableHeaders.map((key: string, index: number): JSX.Element => {
            const currItem: any = item[key];
            return <td className='ListItemValue' key={index}>{currItem}</td>;
          })}
        </tr>
      );
    });

    return (
      <>
        <tr className='ListItemColumnHeader'>
          {tableHeaders.map((key: string, index: number) => { 
            return (
              <th 
                className='ListItemColumnHeaderValue' 
                key={index}
                onClick={() => console.log('sorting by', key)}
              >
                {key.toUpperCase()}
              </th>
            );
          })}
        </tr>
        {tableContent}
      </>
    );
  }
}

export default List;