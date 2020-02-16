import React from 'react';

export interface IListItem {
  mediaType: string;
  id: number;
  title: string;
  releaseDate: Date;
}

export const ListItem: React.FunctionComponent<IListItem> = (props: IListItem) => {
  const keys: string[] = Object.keys(props);
  const itemWidth: number = 100 / keys.length;

  return (
    <>
      {keys?.length > 0 && (
        <div className='ListItem'>
          {keys.map((key: string, index: number) => {
            return (
              <span key={index} style={{ width: `${itemWidth}%` }}>
                {props[key]}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ListItem;