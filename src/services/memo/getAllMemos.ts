import { IAllMemos } from '@/types/memo';
import { ResponseBody } from '@/types/response-body';

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
