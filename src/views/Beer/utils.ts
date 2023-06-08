import { G } from '@mobily/ts-belt';
import { getBeer } from '../../api';
import { type Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = async (setData: (data: Beer) => void, id?: string) => {
  if (G.isNullable(id)) return;

  try {
    const response = await getBeer(id);
    setData(response.data);
  } catch (error) {
    handle(error);
  }
};

export { fetchData };
