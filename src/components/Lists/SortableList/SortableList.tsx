import React, { useState, useEffect } from 'react';
import './SortableList.scss';
import ListItem from '../ListItem/ListItem';
import ListSort from '../ListSort/ListSort';
import { IListColumn, IListItem } from '../interfaces/Lists';

export interface ISortableListProps {
  items: IListItem[];
  label?: string;
  showExternalLabel?: boolean;
  columns?: IListColumn[];
}

export const SortableList: React.FunctionComponent<ISortableListProps> = (props: ISortableListProps) => {
  const [ items, setItems ] = useState(new Array<any>());
  const [ sortBy, setSortBy ] = useState({ field: props.label, show: true, width: 25 } as IListColumn);
  useEffect(() => { setItems(props.items); }, [props.items]);

  const columns: IListColumn[] = props?.columns?.length > 0 ? props?.columns : Object.keys(items).map((key: string): IListColumn => {
    // FIXME broke column width - looks horrible, after adding this part v?
    return { field: key, width: 100 / props.columns.length, show: true };
  });

  const hideLabel: boolean = props.showExternalLabel ? props.showExternalLabel : false;
  const label: string = props.label ? props.label : '';
  
  return (
    <div className='SortableListComponent'>
      {columns?.length > 0 && (
        <>
          {(hideLabel && label) && <label>{label}</label>}
          <select
            id='SortableListComponentSortDropdown'
            onChange={(event: any) => setSortBy({ field: event.target.value, show: true, width: 25 })} 
            value={sortBy.field}
          >
            {label && <option disabled value={label}>{label}</option>}
            {columns.map((column: IListColumn, index: number) => {
              if (column.show) return <option key={index} value={column.field}>{column.field}</option>; 
              return null;
            })}
          </select>
        </>
      )}
      {sortBy.field !== label ? (
        <ListSort items={items} sortBy={sortBy} columns={columns} />
      ) : (
        items?.length > 0 && items.map((item: IListItem, index: number) => { 
          return <ListItem key={index} values={item} columns={columns} />; 
        })
      )}
    </div>
  );
};

export default SortableList;