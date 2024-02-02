'use client';

import { IAllMemos } from '@/types/memo';
import { ResponseBody } from '@/types/response-body';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import Memo from './memo';

type SortOrders = 'DESC' | 'ASC';
type SortTypes = 'createdAt' | 'modifiedAt';

export const getAllMemos = async (
    accessToken: string,
    page: number = 0,
    sortOrder: SortOrders = 'DESC',
    sortType: SortTypes = 'createdAt',
) => {
    const allMemos = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/memo?page=${page}&size=20&sort=${sortType},${sortOrder}`,
        {
            headers: {
                Authorization: `${accessToken}`,
            },
        },
    )
        .then((res) => res.json())
        .then((body: ResponseBody<IAllMemos>) => body.data);

    return allMemos;
};

export default function MemosContainer() {
    const searchParams = useSearchParams();

    const sortOrder = (searchParams.get('order') as SortOrders) ?? 'DESC';
    const sortType = (searchParams.get('type') as SortTypes) ?? 'createdAt';

    const { data: allMemos } = useSuspenseQuery({
        queryKey: ['allMemos', sortOrder, sortType],
        queryFn: () => getAllMemos(`${getCookie('accessToken')}`, 0, sortOrder, sortType),
    });

    return (
        <section className="mx-auto w-full">
            <div className="flex w-[375px] flex-col items-center gap-[16px] ">
                {allMemos.memos.length === 0 ? (
                    <></>
                ) : (
                    allMemos.memos.map((memo) => <Memo key={memo.memoId} memo={memo} />)
                )}
            </div>
        </section>
    );
}
