import { RemoveCircleOutline } from '@mui/icons-material';
import { Alert, Button } from '@mui/material';
import { FC, memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSavedBeersStore } from '../../common/stores/useSavedBeersStore';
import { useSingleBeerContext } from './contexts/SingleBeerContext';

const RemoveSingleBeerRaw: FC = () => {
  console.log('RemoveSingleBeerRaw');
  const beer = useSingleBeerContext();
  const { beers, removeBeer } = useSavedBeersStore();
  const navigate = useNavigate();

  const isBeerSaved = beers.some((savedBeer) => savedBeer.id === beer.id);

  const handleClick = () => {
    removeBeer(beer);
    toast.success('Beer removed');
    navigate('/');
  };

  if (!isBeerSaved) {
    return null;
  }

  return (
    <Button endIcon={<RemoveCircleOutline />} onClick={handleClick}>
      remove
    </Button>
  );
};

export const RemoveSingleBeer: FC = memo(() => {
  return (
    <ErrorBoundary fallbackRender={() => <Alert severity="error">Something went wrong</Alert>}>
      <RemoveSingleBeerRaw />
    </ErrorBoundary>
  );
});
