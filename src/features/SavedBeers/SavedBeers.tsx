import { A } from '@mobily/ts-belt';
import { Alert, Button, Checkbox, Link, List, Paper } from '@mui/material';
import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSavedBeersStore } from '../../common/stores/useSavedBeersStore';

const BeersList: FC = memo(() => {
  console.log('Saved BeersList');
  const { beers } = useSavedBeersStore();

  if (A.isEmpty(beers)) {
    return <Alert severity="warning">No saved items</Alert>;
  }

  return (
    <List>
      {beers.map((beer) => (
        <li key={beer.id}>
          <Checkbox />
          <Link component={RouterLink} to={`/beer/${beer.id}`}>
            {beer.name}
          </Link>
        </li>
      ))}
    </List>
  );
});

export const SavedBeers: FC = memo(() => {
  console.log('SavedBeers');

  return (
    <Paper>
      <h3>Saved items</h3>
      <Button variant="contained" size="small">
        Remove all items
      </Button>

      <BeersList />
    </Paper>
  );
});
