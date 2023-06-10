import { Button, Checkbox, Link, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getRandomBeerList } from '../../api';
import { AvailableBeersList } from '../../features/AvailableBeersList/AvailableBeersList';
import { Beer } from '../../types';
import styles from './Home.module.css';

const Home = () => {
  // const [_, setBeerList] = useState<Beer[]>([]);
  const [savedList] = useState<Beer[]>([]);

  useEffect(() => {
    getRandomBeerList(10)
      .then((data) => {
        // setBeerList(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <main>
      <section>
        <AvailableBeersList />
      </section>
      <section>
        <Paper>
          <div className={styles.listContainer}>
            <div className={styles.listHeader}>
              <h3>Saved items</h3>
              <Button variant="contained" size="small">
                Remove all items
              </Button>
            </div>
            <ul className={styles.list}>
              {savedList.map((beer, index) => (
                <li key={index.toString()}>
                  <Checkbox />
                  <Link component={RouterLink} to={`/beer/${beer.id}`}>
                    {beer.name}
                  </Link>
                </li>
              ))}
              {savedList.length === 0 && <p>No saved items</p>}
            </ul>
          </div>
        </Paper>
      </section>
    </main>
  );
};

export default Home;
