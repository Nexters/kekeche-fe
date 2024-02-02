import { CreateCharacterValues } from '@/context/create-character-provider';
import { ResponseBody } from '@/types/response-body';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

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

const createCharacter = async (createCharacterValues: CreateCharacterValues, accessToken: string) =>
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character`, {
        method: 'POST',
        body: JSON.stringify(createCharacterValues),
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        },
    })
        .then((res) => res.json())
        .then((json) => json.data);

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) throw new Error('요청에 문제 있음');

    // 로그인 로직
    try {
        const { memberId, accessToken } = await login(code);
        cookies().set('accessToken', accessToken, { maxAge: 1000000, httpOnly: false });

        const createCharacterValues = cookies().get('create-character')?.value;

        if (createCharacterValues) {
            const body = JSON.parse(createCharacterValues);
            const { id } = await createCharacter(body, accessToken);

            cookies().delete('create-character');
            return NextResponse.redirect(new URL(`/${memberId}`, request.url));
        }
        return NextResponse.redirect(new URL(`/${memberId}`, request.url));
    } catch (error) {
        console.log('error', error);
    }
    return NextResponse.redirect(new URL('/', request.url));
    // 캐릭터 생성
}
