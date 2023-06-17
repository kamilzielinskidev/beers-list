import { G, O } from '@mobily/ts-belt';
import { createContext, useContext } from 'react';
import { Beer } from '../../../types';

export const SingleBeerContext = createContext<O.Option<Beer>>(O.None);

export const useSingleBeerContext = () => {
  const context = useContext(SingleBeerContext);

  if (G.isNullable(context)) {
    throw new Error('No single beer context available.');
  }

  return context;
};
