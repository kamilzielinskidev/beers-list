import { useQuery } from 'react-query';
import { fetchRandomBeers } from '../api/fetchRandomBeers';
import { G } from '@mobily/ts-belt';

type Where = {
  search?: string;
};

export const useRandomBeerListTE = (where: Where) => {
  return useQuery(['randomBeerList'], fetchRandomBeers, {
    select: (data) => {
      const { search } = where;
      if (G.isNullable(search)) {
        return data;
      }
      return data.filter((beer) => {
        return beer.name.toLowerCase().includes(search.toLowerCase());
      });
    },
  });
};
