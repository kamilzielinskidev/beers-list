import { useQuery } from 'react-query';
import { fetchBeers } from '../api/fetchBeers';

type Where = {
  search?: string;
  page?: number;
  limit?: number;
};

export const useBeerListTE = (where: Where, sort?: 'ASC' | 'DESC') => {
  const { search, page, limit } = where;

  return useQuery(['beerList', search, page, limit, sort], () => fetchBeers(where, sort));
};
