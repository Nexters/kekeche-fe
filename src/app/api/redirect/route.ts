import { ResponseBody } from '@/types/response-body';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

interface LoginResponse {
    memberId: number;
    nickname: string;
    accessToken: string;
}

const login = async (code: string) => {
    const res: ResponseBody<LoginResponse> = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/member/kakao/callback?code=${code}`,
        {
            credentials: 'include',
        },
    ).then((res) => res.json());
    console.log(res.data);
    return res.data;
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) throw new Error('요청에 문제 있음');

    const { memberId, accessToken } = await login(code);
    cookies().set('accessToken', accessToken, { maxAge: 1000000, httpOnly: false });

    return redirect(`/${memberId}`);
}
