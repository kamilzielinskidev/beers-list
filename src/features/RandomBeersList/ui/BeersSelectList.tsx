import { List } from '@mui/material';
import { FC, memo } from 'react';
import { Lambda } from '../../../utils/lambda';
import { Beer } from '../../../types';
import { SingleBeer } from './SingleBeer';

// TODO: make it generic
export const BeersSelectList: FC<{
  data: Beer[];
  value: Beer[];
  onSelect: Lambda<Beer, void>;
  onItemClick: Lambda<Beer, void>;
}> = memo(({ data, value, onSelect, onItemClick }) => {
  console.log('BeersSelectList');
  return (
    <List>
      {data.map((item) => {
        const isSelected = value.includes(item);

        return (
          <SingleBeer
            key={item.id}
            data={item}
            checked={isSelected}
            setChecked={() => {
              onSelect(item);
            }}
            onClick={() => {
              onItemClick(item);
            }}
          />
        );
      })}
    </List>
  );
});
