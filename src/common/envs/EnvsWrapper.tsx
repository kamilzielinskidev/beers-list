import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { checkEnvs } from '../envs';
import { Alert, CircularProgress } from '@mui/material';

export const EnvsWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [areEnvsLoaded, setAreEnvsLoaded] = useState(false);
  const [areEnvsValid, setAreEnvsValid] = useState(true);

  useEffect(() => {
    try {
      checkEnvs(['REACT_APP_API']);
      setAreEnvsLoaded(true);
    } catch (e) {
      setAreEnvsLoaded(true);
      setAreEnvsValid(false);
    }
  }, []);

  if (!areEnvsLoaded) {
    return <CircularProgress size={40} />;
  }

  if (!areEnvsValid) {
    return <Alert severity="error">Something went wrong. Try again later.</Alert>;
  }

  return <>{children}</>;
};
