import React from 'react';
import { IListColumn, IListItem } from '../interfaces/Lists';

export interface IListItemProps {
  columns: IListColumn[];
  values: IListItem;
}

export const ListItem: React.FunctionComponent<IListItemProps> = (props: IListItemProps) => {
  const columns: IListColumn[] = props?.columns.length > 0 ? props?.columns : Object.keys(props).map((key: string): IListColumn => { 
    return { field: key, show: true, width: 100 / props.columns.length }; 
  });

  return (
    <>
      {columns?.length > 0 && (
        <div className='ListItem'>
          {columns.map((column: IListColumn, index: number) => {
            if (column.show) {
              return (
                <span key={index} style={{ width: `${column.width}%` }}>
                  {props.values[column.field]}
                </span>
              );
            }
            return null;
          })}
        </div>
      )}
    </>
  );
};

export default ListItem;