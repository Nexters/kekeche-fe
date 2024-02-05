'use client';

import { getAllMemos } from '@/services/getAllMemos';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import Memo from './memo';
import NoMemo from './no-memo';
import { SortOrders, SortTypes } from '@/types/memo';

export default function MemosContainer() {
    const searchParams = useSearchParams();

    const search = searchParams.get('search');

    const sortOrder = (searchParams.get('order') as SortOrders) ?? 'DESC';
    const sortType = (searchParams.get('type') as SortTypes) ?? 'createdAt';

    const { data: allMemos } = useSuspenseQuery({
        queryKey: ['allMemos'],
        queryFn: () => getAllMemos(`${getCookie('accessToken')}`, 0, sortOrder, sortType),
    });

    return (
        <section className="mx-auto w-full pb-11">
            <div className="flex w-[375px] flex-col items-center gap-[16px] ">
                {allMemos?.memos.length === 0 ? (
                    <NoMemo />
                ) : (
                    allMemos?.memos.map((memo) => <Memo key={memo.id} memo={memo} />)
                )}
            </div>
        </section>
    );
}
