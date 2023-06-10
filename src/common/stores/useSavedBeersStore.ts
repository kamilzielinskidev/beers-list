import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Beer } from '../../types';
import { Store } from './store';

type SavedBeersState = {
  beers: Beer[];
  addBeer: (beer: Beer) => void;
  addManyBeer: (beer: Beer[]) => void;
  removeBeer: (beer: Beer) => void;
  clear: () => void;
};

// TODO: test
const addBeer =
  (beer: Beer) =>
  (state: SavedBeersState): SavedBeersState => {
    return { ...state, beers: [...state.beers, beer] };
  };

const addManyBeer =
  (beers: Beer[]) =>
  (state: SavedBeersState): SavedBeersState => {
    return { ...state, beers: [...state.beers, ...beers] };
  };

// TODO: test
const removeBeer =
  (beer: Beer) =>
  (state: SavedBeersState): SavedBeersState => {
    return { ...state, beers: state.beers.filter(({ id }) => beer.id !== id) };
  };

// TODO: test
const clear = () => (state: SavedBeersState) => {
  return { ...state, beers: [] };
};

const savedBeersStore: Store<SavedBeersState> = (set) => ({
  beers: [],
  addBeer: (beer) => {
    set(addBeer(beer));
  },
  addManyBeer: (beers) => {
    set(addManyBeer(beers));
  },
  removeBeer: (beer) => {
    set(removeBeer(beer));
  },
  clear: () => {
    set(clear());
  },
});

export const useSavedBeersStore = create<SavedBeersState>()(
  persist(savedBeersStore, {
    name: 'beers-storage',
  }),
);
