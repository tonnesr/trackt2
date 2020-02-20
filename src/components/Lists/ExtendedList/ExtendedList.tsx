import React, { useState, useEffect } from 'react';
import './ExtendedList.scss';

export interface IExtendedListItem {
  type: string;
  id: number;
  title: string;
  releaseDate: Date;
}

export interface IExtendedListProps {
  items: IExtendedListItem[];
}
export const ExtendedList: React.FunctionComponent<IExtendedListProps> = (props: IExtendedListProps): JSX.Element => {      
  const keys: string[] = Object.keys(props.items); // TODO ? Translate to columns, with more properties?
  
  return (
    <div className='ExtendedListComponent'>
      <div className='ExtendedListHeader'>
        <select>

        </select>
      </div>
      <div className='ExtendedListItemContainer'>
        {props.items?.length > 0 && (
          props.items.map((item: IExtendedListItem): JSX.Element => {
            return <ExtendedListItem keys={keys} itemProps={item} />;
          })
        )}
      </div>
    </div>
  );
};

export interface IExtendedListItemProps {
  keys: string[];
  itemProps: IExtendedListItem;
}
export const ExtendedListItem: React.FunctionComponent<IExtendedListItemProps> = (props: IExtendedListItemProps): JSX.Element => {
  return (
    <div className='ExtendedListItemComponent'>
      {props.keys?.length > 0 && props.keys.map((key: string): JSX.Element => {
        return (
          <div className='ListItemColumn' key={key} title={key}>
            {props.itemProps && props.itemProps[key]}
          </div>
        );
      })}
    </div>
  );
};