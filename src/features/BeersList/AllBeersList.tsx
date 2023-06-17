import { A, G } from '@mobily/ts-belt';
import { ArrowDownward, ArrowUpward, SportsBar } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { FC, memo, useCallback } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useBeerListTE } from '../RandomBeersList/hooks/useBeerListTE';
import { styles } from './AllBeersList.styles';

export const AllBeersList: FC = memo(() => {
  console.log('AllBeersList');
  // TODO: handle it via separate hook or page context, current useQueryParam does not work
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const sortingParam = searchParams.get('sorting');

  const parsedPage = G.isNullable(pageParam) ? 1 : parseInt(pageParam);
  const parsedSorting = G.isNullable(sortingParam) ? 'ASC' : sortingParam === 'desc' ? 'DESC' : 'ASC';

  const { data, status } = useBeerListTE({ limit: 10, page: parsedPage }, parsedSorting);

  const handleNextPage = useCallback(() => {
    searchParams.set('page', `${parsedPage + 1}`);
    setSearchParams(searchParams);
  }, [searchParams, parsedPage]);

  const handlePreviousPage = useCallback(() => {
    searchParams.set('page', `${parsedPage - 1}`);
    setSearchParams(searchParams);
  }, [searchParams, parsedPage]);

  const handleSortAsc = useCallback(() => {
    searchParams.set('sorting', `asc`);
    setSearchParams(searchParams);
  }, [searchParams]);

  const handleSortDesc = useCallback(() => {
    searchParams.set('sorting', `desc`);
    setSearchParams(searchParams);
  }, [searchParams]);

  const isFirstPage = parsedPage === 1;

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
    <Grid container sx={styles.container}>
      <Grid container>
        <IconButton disabled={parsedSorting === 'ASC'} onClick={handleSortAsc}>
          <ArrowUpward />
        </IconButton>
        <IconButton disabled={parsedSorting === 'DESC'} onClick={handleSortDesc}>
          <ArrowDownward />
        </IconButton>
      </Grid>

      <List>
        {data.map((beer) => (
          <ListItemButton key={beer.id} component={RouterLink} to={`/beer/${beer.id}`}>
            <ListItemAvatar>
              <Avatar>
                <SportsBar />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={beer.name} secondary={beer.brewery_type} />
          </ListItemButton>
        ))}
      </List>

      <Grid container sx={styles.paginationContainer}>
        <Button disabled={isFirstPage} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Button onClick={handleNextPage}>Next</Button>
      </Grid>
    </Grid>
  );
});
