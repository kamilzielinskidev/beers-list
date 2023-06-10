import { RandomBeersList } from '../../features/RandomBeersList/RandomBeersList';
import { SavedBeers } from '../../features/SavedBeers/SavedBeers';

const Home = () => {
  return (
    <main>
      <section>
        <RandomBeersList />
      </section>
      <section>
        <SavedBeers />
      </section>
    </main>
  );
};

export default Home;
