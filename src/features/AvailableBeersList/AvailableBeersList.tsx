import { A, S } from '@mobily/ts-belt';
import { Alert, Checkbox, CircularProgress, Grid, Link, List, Paper, TextField } from '@mui/material';
import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { useQueryParam } from '../../common/hooks/useQueryParam';
import { useBeerListTE } from './hooks/getBeersList';

const SearchFilter: FC = memo(() => {
  console.log('SearchFilter');
  const [searchParams, setSearchParams] = useQueryParam('search');

  return (
    <TextField
      label="Filter..."
      variant="outlined"
      value={searchParams}
      onChange={(e) => {
        setSearchParams(e.target.value);
      }}
    />
  );
});

const BeersList: FC = () => {
  console.log('BeersList');
  const [searchParams] = useQueryParam('search');
  const debouncedSearch = useDebounce(searchParams, 500);
  // TODO: use random list instead
  const { data, status } = useBeerListTE({
    search: S.isEmpty(debouncedSearch) ? undefined : debouncedSearch,
    limit: 10,
  });

  if (status === 'loading' || status === 'idle') {
    return <CircularProgress />;
  }

  if (status === 'error') {
    return <Alert severity="error">Could not fetch beers list</Alert>;
  }

  if (A.isEmpty(data)) {
    return <Alert severity="warning">No beers available...</Alert>;
  }

  return (
    <List>
      {data.map((beer) => (
        <Grid key={beer.id}>
          <Checkbox />
          <Link component={RouterLink} to={`/beer/${beer.id}`}>
            {beer.name}
          </Link>
        </Grid>
      ))}
    </List>
  );
};

export const AvailableBeersList: FC = () => {
  console.log('AvailableBeersList');
  return (
    <Paper>
      <SearchFilter />
      <BeersList />
    </Paper>
  );
};
