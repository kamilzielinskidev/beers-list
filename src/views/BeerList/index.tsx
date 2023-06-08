import { useEffect, useState } from 'react';
import { Beer } from '../../types';

import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import { getRandomBeerList } from '../../api';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Beer[]>([]);

  useEffect(() => {
    getRandomBeerList(10)
      .then((data) => {
        setBeerList(data.data);
      })
      .catch(console.error);
  }, []);

  const onBeerClick = (id: string) => {
    navigate(`/beer/${id}`);
  };

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <List>
            {beerList.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
