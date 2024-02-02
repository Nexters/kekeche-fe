'use client';

import { useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { getAllMemos } from '@/services/getAllMemos';
import { useQuery } from '@tanstack/react-query';
import NoMemo from './no-memo';
import Memo from './memo';

type SortOrders = 'DESC' | 'ASC';
type SortTypes = 'createdAt' | 'modifiedAt';

export default function MemosContainer() {
    const searchParams = useSearchParams();

    const search = searchParams.get('search');
    console.log(search);

    const sortOrder = (searchParams.get('order') as SortOrders) ?? 'DESC';
    const sortType = (searchParams.get('type') as SortTypes) ?? 'createdAt';

    const { data: allMemos } = useQuery({
        queryKey: ['allMemos', sortOrder, sortType],
        queryFn: () => getAllMemos(`${getCookie('accessToken')}`, 0, sortOrder, sortType),
    });

    return (
        <section className="mx-auto w-full">
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
