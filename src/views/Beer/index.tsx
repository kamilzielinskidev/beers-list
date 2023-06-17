import { Alert, CircularProgress, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RemoveSingleBeer } from '../../features/SingleBeer/RemoveSingleBeer';
import { SingleBeerContext } from '../../features/SingleBeer/contexts/SingleBeerContext';
import { Beer as IBeer } from '../../types';
import { styles } from './index.styles';
import { fetchData } from './utils';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERRROR'>('IDLE');

  useEffect(() => {
    setStatus('LOADING');

    fetchData(id)
      ?.then((data) => {
        setBeer(data.data);
        setStatus('SUCCESS');
      })
      .catch(() => {
        setStatus('ERRROR');
      });
  }, [id]);

  if (status === 'IDLE' || status === 'LOADING') {
    return <CircularProgress />;
  }

  if (status === 'ERRROR') {
    return <Alert severity="error">Could not fetch beer</Alert>;
  }

  return (
    <SingleBeerContext.Provider value={beer}>
      <article>
        <section>
          <Grid container sx={styles.headerContainer}>
            <Grid item>
              <h1>{beer?.name}</h1>
            </Grid>
            <RemoveSingleBeer />
          </Grid>
          <main>
            <span>
              <b>Type: </b> {beer?.brewery_type}
            </span>
          </main>
        </section>
      </article>
    </SingleBeerContext.Provider>
  );
};

export default Beer;
