import { G } from '@mobily/ts-belt';
import { getBeer } from '../../api';

const fetchData = (id?: string) => {
  if (G.isNullable(id)) return;

  return getBeer(id);
};

export { fetchData };
