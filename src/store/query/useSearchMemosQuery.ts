import { searchMemos } from '@/services/memo/searchMemos';
import { AllMemos, SortOrders, SortTypes } from '@/types/memo';
import { BasicQueryOptions } from '@/types/query';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';

const STALE_TIME = 1000 * 60 * 1;

export const searchMemosQueryOptions = (accessToken: string, searchValue: string): BasicQueryOptions<AllMemos> => ({
    queryKey: ['memos', 'search', searchValue],
    queryFn: () => searchMemos(accessToken, searchValue, 0, 'DESC', 'createdAt'),
});

export function useSearchMemosQuery() {
    const searchParams = useSearchParams();

    const searchValue = searchParams.get('search') ?? '';

    return {
        searchValue,
        ...useQuery({
            ...searchMemosQueryOptions(`${getCookie('accessToken')}`, searchValue),
            staleTime: STALE_TIME,
            enabled: searchValue.length > 0,
        }),
    };
}
