import { Lambda } from '../../utils/lambda';

export type Store<A> = (setFn: Lambda<Lambda<A, Partial<A>>, void>) => A;
