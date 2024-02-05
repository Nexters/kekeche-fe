import { ResponseBody } from '@/types/response-body';

interface LoginResponse {
    memberId: number;
    nickname: string;
    accessToken: string;
}

export const login = async (code: string) => {
    const res: ResponseBody<LoginResponse> = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/auth/kakao/callback?code=${code}`,
    ).then((res) => res.json());
    return res.data;
};
