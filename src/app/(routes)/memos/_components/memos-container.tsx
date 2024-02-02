'use client';

import Memo from './memo';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { getAllMemos } from '@/services/getAllMemos';
import NoMemo from './no-memo';

type SortOrders = 'DESC' | 'ASC';
type SortTypes = 'createdAt' | 'modifiedAt';

export default function MemosContainer() {
    const searchParams = useSearchParams();

    const search = searchParams.get('search');

    const sortOrder = (searchParams.get('order') as SortOrders) ?? 'DESC';
    const sortType = (searchParams.get('type') as SortTypes) ?? 'createdAt';

    const { data: allMemos } = useQuery({
        queryKey: ['allMemos', sortOrder, sortType],
        queryFn: () => getAllMemos(`${getCookie('accessToken')}`, 0, sortOrder, sortType),
    });

    return (
        <section className="mx-auto w-full">
            <div className="flex w-[375px] flex-col items-center gap-[16px] ">
                <NoMemo />
                {/* {allMemos?.memos.length === 0 ? (
                    <></>
                ) : (
                    allMemos?.memos.map((memo) => <Memo key={memo.memoId} memo={memo} />)
                )} */}
            </div>
        </section>
    );
}
