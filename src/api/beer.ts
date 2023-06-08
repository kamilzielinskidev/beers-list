import axios from 'axios';
import { API } from './config';
import { type ApiParams } from '../types';

const getBeer = async (id: string) => await axios.get(`${API}breweries/${id}`);

const getBeerList = async (params?: ApiParams) => await axios.get(`${API}breweries/`, { params });

/**
 * @param size Int between 1 and 50. Default is 3.
 * @returns New promise with api call for random beer list.
 */
const getRandomBeerList = async (size = 3) =>
  await axios.get(`${API}breweries/random`, {
    params: { size },
  });

const searchBeerList = async (query: string, isAutoComplete = false) =>
  await axios.get(`${API}breweries/${isAutoComplete ? 'autocomplete' : 'search'}`, {
    params: { query },
  });

const getBeerMetaData = async (params?: ApiParams) => await axios.get(`${API}breweries/meta`, { params });

export { getBeer, getBeerList, getRandomBeerList, searchBeerList, getBeerMetaData };
