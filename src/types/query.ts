import { FetchQueryOptions } from '@tanstack/react-query';

export type PrefetchOptions = Pick<FetchQueryOptions, 'queryKey' | 'queryFn'>;

export type BasicQueryOptions = PrefetchOptions;
