import { Typography } from '@mui/material';
import { AllBeersList } from '../../features/BeersList/AllBeersList';

const BeerList = () => {
  return (
    <main>
      <Typography>BeerList page</Typography>
      <AllBeersList />
    </main>
  );
};

export default BeerList;
