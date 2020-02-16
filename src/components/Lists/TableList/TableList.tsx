import React, { useState, useEffect } from 'react';
import './TableList.scss';
import { IListItem } from '../ListItem/ListItem';

export interface IListProps {
  items: IListItem[];
}

export const TableList: React.FunctionComponent<IListProps> = (props: IListProps) => {
  const [ items, setItems ] = useState(new Array<IListItem>());
  useEffect(() => { setItems(props.items); }, [props.items]);

  return (
    <div className='TableListComponent'>
      {items && (
          <table className='TableListItemContainer'>
            <tbody>
              {renderTable(items)}
            </tbody>
          </table>
      )}
    </div>
  );
};

function renderTable(items: IListItem[]): JSX.Element {
  if (items.length > 0) {
    const tableHeaders: string[] = Object.keys(items[0]);
    const tableContent: JSX.Element[] = items.map((item: IListItem) => { 
      return (
        <tr className='TableListItemRow' key={item.id}>
          {tableHeaders.map((key: string, index: number): JSX.Element => {
            const currItem: any = item[key];
            return <td className='TableListItemValue' key={index}>{currItem}</td>;
          })}
        </tr>
      );
    });

    return (
      <>
        <tr className='TableListItemColumnHeader'>
          {tableHeaders.map((key: string, index: number) => { 
            return (
              <th 
                className='TableListItemColumnHeaderValue' 
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

export default TableList;