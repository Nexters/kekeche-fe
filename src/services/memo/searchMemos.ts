import { AllMemos, SortOrders, SortTypes } from '@/types/memo';
import { ResponseBody } from '@/types/response-body';

export const searchMemos = async (
    accessToken: string,
    value: string,
    page: number = 0,
    sortOrder: SortOrders = 'DESC',
    sortType: SortTypes = 'createdAt',
) => {
    const allMemos = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/memo/search?keyword=${value}&page=${page}&size=20&sort=${sortType},${sortOrder}`,
        {
            headers: {
                Authorization: `${accessToken}`,
            },
        },
    )
        .then((res) => res.json())
        .then((body: ResponseBody<AllMemos>) => body.data);

    return allMemos;
};
