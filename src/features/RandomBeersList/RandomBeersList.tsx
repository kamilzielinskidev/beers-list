import { A } from '@mobily/ts-belt';
import { Alert, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryParam } from '../../common/hooks/useQueryParam';
import { useSavedBeersStore } from '../../common/stores/useSavedBeersStore';
import { Beer } from '../../types';
import { styles } from './RandomBeersList.styles';
import { useRandomBeerListTE } from './hooks/useRandomBeerListTE';
import { BeersSelectList } from './ui/BeersSelectList';
import { SearchFilter } from './ui/SearchFilter';
import { toast } from 'react-toastify';

export const RandomBeersList: FC = memo(() => {
  console.log('RandomBeersList');
  const [searchParams, setSearchParams] = useQueryParam('search');
  const [selectedBeers, setSelectedBeers] = useState<Beer[]>([]);
  const { data, status, refetch } = useRandomBeerListTE({ search: searchParams });
  const { beers, addManyBeer } = useSavedBeersStore();
  const navigate = useNavigate();

  const handleSetSearchParams = useCallback((v: string) => {
    setSearchParams(v);
  }, []);

  const handleSelect = useCallback(
    (beer: Beer) => {
      if (selectedBeers.includes(beer)) {
        setSelectedBeers((selectedBeers) => selectedBeers.filter((selectedBeer) => selectedBeer !== beer));
      } else {
        setSelectedBeers((selectedBeers) => [...selectedBeers, beer]);
      }
    },
    [selectedBeers],
  );

  const handleSave = () => {
    addManyBeer(selectedBeers);
    setSelectedBeers([]);
    refetch();
    toast.success('Beers saved');
  };

  const handleItemClick = useCallback((item: Beer) => {
    navigate(`/beer/${item.id}`);
  }, []);

  if (status === 'loading' || status === 'idle') {
    return <CircularProgress />;
  }

  if (status === 'error') {
    return <Alert severity="error">Could not fetch beers list</Alert>;
  }

  if (A.isEmpty(data)) {
    return <Alert severity="warning">No beers available...</Alert>;
  }

  const filteredData = data.filter((item) => !A.some(beers, (beer) => beer.id === item.id));

  return (
    <Paper sx={styles.paper}>
      <Grid container sx={styles.container}>
        <Grid item>
          <Typography sx={styles.title}>Today&apos;s suggestions</Typography>
        </Grid>
        <Grid item sx={styles.searchContainer}>
          <SearchFilter value={searchParams} onChange={handleSetSearchParams} />
        </Grid>
        <Grid item>
          <BeersSelectList
            data={filteredData}
            value={selectedBeers}
            onSelect={handleSelect}
            onItemClick={handleItemClick}
          />
        </Grid>
        {A.isEmpty(selectedBeers) ? null : (
          <Grid item>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
});
