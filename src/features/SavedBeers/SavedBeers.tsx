import { Grid, Paper, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { useSavedBeersStore } from '../../common/stores/useSavedBeersStore';
import { styles } from './SavedBeers.styles';
import { ConfirmationPrompt } from './ui/ConfirmationPrompt';
import { LinksList } from './ui/LinksList';

export const SavedBeers: FC = memo(() => {
  console.log('SavedBeers');
  const { beers, clear } = useSavedBeersStore();

  const parsedBeers = beers.map((beer) => ({
    id: beer.id,
    label: beer.name,
    url: `/beer/${beer.id}`,
  }));

  return (
    <Paper sx={styles.paper}>
      <Grid container sx={styles.container}>
        <Grid item container sx={styles.headContainer}>
          <Typography sx={styles.title}>Saved items</Typography>
          <ConfirmationPrompt
            label="Delete saved"
            message="Are you sure you want to delete saved beers?"
            onOk={clear}
          />
        </Grid>
        <Grid item sx={styles.listContainer}>
          <LinksList items={parsedBeers} />
        </Grid>
      </Grid>
    </Paper>
  );
});
