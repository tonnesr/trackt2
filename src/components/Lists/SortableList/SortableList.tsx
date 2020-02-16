import React, { useState, useEffect } from 'react';
import './SortableList.scss';
import ListItem, { IListItem } from '../ListItem/ListItem';
import ListSort from './ListSort/ListSort';
import { IListColumn } from '../interfaces/Lists';

export interface ISortableListProps {
  items: IListItem[];
  label?: string;
  showExternalLabel?: boolean;
  columns?: IListColumn[];
}

// TODO Use Keys from props.columns!
export const SortableList: React.FunctionComponent<ISortableListProps> = (props: ISortableListProps) => {
  const [ items, setItems ] = useState(new Array<any>());
  const [ sortBy, setSortBy ] = useState(props.label);
  useEffect(() => { setItems(props.items); }, [props.items]);

  const keys: string[] = props?.columns?.length > 0 ? props?.columns?.map((key: IListColumn) => { 
    return key.field; 
  }) : [];

  console.log(keys);

  const hideLabel: boolean = props.showExternalLabel ? props.showExternalLabel : false;
  const label: string = props.label ? props.label : '';
  
  // TODO Use Keys from props.columns!
  return (
    <div className='SortableListComponent'>
      {keys?.length > 0 && (
        <>
          {(hideLabel && label) && <label>{label}</label>}
          <select 
            id='SortableListComponentSortDropdown'
            onChange={(event: any) => setSortBy(event.target.value)} 
            value={sortBy}
          >
            {label && <option disabled value={label}>{label}</option>}
            {keys.map((key: string, index: number) => { 
              return <option key={index} value={key}>{key}</option>; 
            })}
          </select>
        </>
      )}
      {sortBy !== label ? (
        <ListSort items={items} sortBy={sortBy} />
      ) : (
        items?.length > 0 && items.map((item: IListItem, index: number) => { 
          return <ListItem key={index} {...item} />; 
        })
      )}
    </div>
  );
};

export default SortableList;