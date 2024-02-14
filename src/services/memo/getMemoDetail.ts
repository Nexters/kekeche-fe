import { Memo } from '@/types/memo';
import { ResponseBody } from '@/types/response-body';

export const getMemoDetail = async (accessToken: string, memoId: number) => {
    const memo = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/memo/${memoId}`, {
        headers: {
            Authorization: `${accessToken}`,
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((body: ResponseBody<Memo>) => body.data);

    return memo;
};
