import { G } from '@mobily/ts-belt';
import axios from 'axios';
import { Beer } from '../../../types';

type Where = {
  search?: string;
  page?: number;
  limit?: number;
};

const sortNameQueryBuilder = (sort?: 'ASC' | 'DESC') => {
  switch (sort) {
    case undefined:
      return '';
    case 'ASC':
      return '&sort=type,name:asc';
    case 'DESC':
      return '&sort=type,name:desc';
  }
};

export const fetchBeers = (where: Where, sort?: 'ASC' | 'DESC') => {
  const sortNameQuery = sortNameQueryBuilder(sort);

  const { limit, page, search } = where;

  const limitQuery = G.isNullable(limit) ? `` : `&per_page=${limit}`;
  const pageQuery = G.isNullable(page) ? `` : `&page=${page}`;

  if (G.isNullable(search)) {
    return axios
      .get<Beer[]>(`https://api.openbrewerydb.org/v1/breweries?${limitQuery}${pageQuery}${sortNameQuery}`)
      .then((res) => res.data);
  }

  const searchQuery = `&query=${search}`;

  return axios
    .get<Beer[]>(
      `https://api.openbrewerydb.org/v1/breweries/search?${searchQuery}${limitQuery}${pageQuery}${sortNameQuery}`,
    )
    .then((res) => res.data);
};
