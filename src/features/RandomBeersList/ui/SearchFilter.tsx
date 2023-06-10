import { TextField } from '@mui/material';
import { FC, memo } from 'react';
import { Lambda } from '../../../utils/lambda';

export const SearchFilter: FC<{ value: string; onChange: Lambda<string, void> }> = memo(({ value, onChange }) => {
  console.log('SearchFilter');

  return (
    <TextField
      label="Filter..."
      variant="outlined"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
});
