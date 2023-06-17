import { A } from '@mobily/ts-belt';
import { Alert, Link, List, ListItem } from '@mui/material';
import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Item = {
  id: string;
  label: string;
  url: string;
};

export const LinksList: FC<{ items: Item[] }> = memo(({ items }) => {
  console.log('LinksList');

  if (A.isEmpty(items)) {
    return <Alert severity="warning">No saved items</Alert>;
  }

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <Link component={RouterLink} to={`${item.url}`}>
            {item.label}
          </Link>
        </ListItem>
      ))}
    </List>
  );
});
