import axios from 'axios';
import { Beer } from '../../../types';

export const fetchRandomBeers = () => {
  return axios.get<Beer[]>('https://api.openbrewerydb.org/v1/breweries/random?size=5').then((res) => res.data);
};
