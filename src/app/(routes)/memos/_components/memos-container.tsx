'use client';

import { ResponseBody } from '@/types/response-body';
import Memo from './memo';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

interface Memo {
    memoId: number;
    characterId: number;
    content: string;
    createdAt: Date;
}

type SortOrders = 'DESC' | 'ASC';
type SortTypes = 'createdAt' | 'modifiedAt';

export const getAllMemos = async (
    page: number = 0,
    sortOrder: SortOrders = 'DESC',
    sortType: SortTypes = 'createdAt',
) => {
    const memos = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/memo?page=${page}&size=20&sort=${sortOrder},${sortType}`,
        {
            // 쿠키로 부터 토큰 추출하여 헤더에 넣어주기
        },
    )
        .then((res) => res.json())
        .then((body: ResponseBody<Memo[]>) => body.data);

    return memos;
};

export default function MemosContainer() {
    const searchParams = useSearchParams();

    const sortOrder = (searchParams.get('order') as SortOrders) ?? 'DESC';
    const sortType = (searchParams.get('type') as SortTypes) ?? 'createAt';

    // const { data: memos } = useSuspenseQuery({
    //     queryKey: ['memos', sortOrder, sortType],
    //     queryFn: () => getAllMemos(0, sortOrder, sortType),
    // });

    return (
        <div className="flex w-[375px] justify-center ">
            <Memo key={1} />
            {/* {memos.map((memo) => (
                <Memo key={memo.memoId} />
            ))} */}
        </div>
    );
}
