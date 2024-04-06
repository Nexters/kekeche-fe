import { getAllMemos } from '@/services/memo/getAllMemos';
import { AllMemos, SortOrders, SortTypes } from '@/types/memo';
import { BasicSuspenseQueryOptions } from '@/types/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const STALE_TIME = 1000 * 60 * 5;

export const allMemosQueryOptions = (
    accessToken: string,
    sortOrder?: SortOrders,
    sortType?: SortTypes,
): BasicSuspenseQueryOptions<AllMemos> => ({
    queryKey: ['allMemos'],
    queryFn: () => getAllMemos(accessToken, 0, sortOrder ?? 'DESC', sortType ?? 'createdAt'),
});

export function useAllMemosQuery(sortOrder?: SortOrders, sortType?: SortTypes) {
    return useSuspenseQuery({
        ...allMemosQueryOptions(`${getCookie('accessToken')}`, sortOrder, sortType),
        staleTime: STALE_TIME,
    });
}
