import { Checkbox, Grid, Link } from '@mui/material';
import { FC, memo } from 'react';
import { Beer } from '../../../types';
import { Lambda } from '../../../utils/lambda';

// TODO: make it generic, selectable list item or something
export const SingleBeer: FC<{
  data: Beer;
  checked: boolean;
  setChecked: Lambda<void, void>;
  onClick: Lambda<void, void>;
}> = memo(({ data, checked, setChecked, onClick }) => {
  console.log('SingleBeer', data.id);
  return (
    <Grid>
      <Checkbox
        value={checked}
        onChange={(e) => {
          setChecked();
        }}
      />
      <Link
        onClick={() => {
          onClick();
        }}
      >
        {data.name}
      </Link>
    </Grid>
  );
});
