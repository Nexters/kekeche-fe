import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createCharacter } from '@/components/create-character/steps/show-result';
import { ResponseBody } from '@/types/response-body';

interface LoginResponse {
    memberId: number;
    nickname: string;
    accessToken: string;
}

const login = async (code: string) => {
    const res: ResponseBody<LoginResponse> = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/auth/character-kakao/callback?code=${code}`,
    ).then((res) => res.json());
    return res.data;
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) throw new Error('요청에 문제 있음');

    // 로그인 로직
    try {
        const response = await login(code);
        console.log(response);
        const { memberId, accessToken } = await login(code);
        cookies().set('accessToken', accessToken, { maxAge: 1000000, httpOnly: false });
        console.log('accessToken', accessToken);
        const createCharacterValues = cookies().get('create-character')?.value;

        if (createCharacterValues !== undefined) {
            const body = JSON.parse(createCharacterValues);
            const { id } = await createCharacter(body, accessToken);
            console.log(id);
            cookies().delete('create-character');
            return NextResponse.redirect(`/character/${id}`);
        }
        return NextResponse.redirect(`/${memberId}`);
    } catch (error) {
        console.log('error', error);
    }
    return NextResponse.redirect(`/`);
    // 캐릭터 생성
}
