import { A, S } from '@mobily/ts-belt';
import { SportsBar } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { FC, memo, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQueryParam } from '../../common/hooks/useQueryParam';
import { useBeerListTE } from '../RandomBeersList/hooks/useBeerListTE';
import { styles } from './AllBeersList.styles';

export const AllBeersList: FC = memo(() => {
  console.log('AllBeersList');
  const [page, setPage] = useQueryParam('page');
  const parsedPage = S.isEmpty(page) ? 1 : parseInt(page);
  const { data, status } = useBeerListTE({ limit: 10, page: parsedPage });

  const handleNextPage = useCallback(() => {
    setPage(`${parsedPage + 1}`);
  }, [parsedPage]);

  const handlePreviousPage = useCallback(() => {
    setPage(`${parsedPage - 1}`);
  }, [parsedPage]);

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
