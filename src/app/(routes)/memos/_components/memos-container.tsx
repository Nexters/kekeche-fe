'use client';

import { getAllMemos } from '@/services/memo/getAllMemos';
import { SortOrders, SortTypes } from '@/types/memo';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import Memo from './memo';
import NoMemo from './no-memo';
import { searchMemos } from '@/services/memo/searchMemos';

export default function MemosContainer() {
    const searchParams = useSearchParams();

    const searchValue = searchParams.get('search') ?? '';

    const sortOrder = (searchParams.get('order') as SortOrders) ?? 'DESC';
    const sortType = (searchParams.get('type') as SortTypes) ?? 'createdAt';

    const { data: allMemos } = useSuspenseQuery({
        queryKey: ['allMemos'],
        queryFn: () => getAllMemos(`${getCookie('accessToken')}`, 0, sortOrder, sortType),
        staleTime: 1000 * 60,
    });

    const { data: searchedMemos } = useQuery({
        queryKey: ['memos', 'search', searchValue],
        queryFn: () => searchMemos(`${getCookie('accessToken')}`, searchValue, 0, 'DESC', 'createdAt'),
        staleTime: 1000 * 60,
        enabled: searchValue.length > 0,
    });

    return (
        <section className="mx-auto w-full pb-11">
            <div className="flex w-full flex-col items-center gap-[16px] px-[24px] ">
                {searchValue && searchedMemos ? (
                    searchedMemos.memos.map((memo) => <Memo key={memo.id} memo={memo} />)
                ) : allMemos?.memos.length === 0 ? (
                    <NoMemo />
                ) : (
                    allMemos?.memos.map((memo) => <Memo key={memo.id} memo={memo} />)
                )}
            </div>
        </section>
    );
}
