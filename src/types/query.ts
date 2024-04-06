import { FetchQueryOptions, UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';

export type PrefetchOptions = Pick<FetchQueryOptions, 'queryKey' | 'queryFn'>;

export type BasicSuspenseQueryOptions<T> = Pick<UseSuspenseQueryOptions<T>, 'queryKey' | 'queryFn'>;
export type BasicQueryOptions<T> = Pick<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
