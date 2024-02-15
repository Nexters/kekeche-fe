import { AllMemos, SortOrders, SortTypes } from '@/types/memo';
import { ResponseBody } from '@/types/response-body';

export type getCharacterMemosRequest = {
    accessToken: string;
    characterId: number;
    page?: number;
    sortOrder?: SortOrders;
    sortType?: SortTypes;
};

export const getCharacterMemos = async ({
    accessToken,
    characterId,
    page = 0,
    sortOrder = 'DESC',
    sortType = 'createdAt',
}: getCharacterMemosRequest) => {
    const allMemos = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/memo/character/${characterId}?page=${page}&size=20&sort=${sortType},${sortOrder}`,
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
