import { S } from '@mobily/ts-belt';
import { useSearchParams } from 'react-router-dom';

export const useQueryParam = (queryParam: string) => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const value = searchParams.get(queryParam) ?? '';

  const setValue = (value: string) => {
    if (S.isEmpty(value)) {
      setSearchParams({});
    } else {
      setSearchParams({ [queryParam]: value });
    }
  };

  return [value, setValue] as const;
};
