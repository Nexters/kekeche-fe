import { ResponseBody } from '@/types/response-body';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { CreateCharacterValues } from '@/context/create-character-provider';
import { createCharacter } from '@/components/create-character/steps/show-result';

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

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) throw new Error('요청에 문제 있음');

    const { memberId, accessToken } = await login(code);

    cookies().set('accessToken', accessToken, { maxAge: 1000000, httpOnly: false });

    // 캐릭터 생성
    // const createCharacterValues = cookies().get('create-character')?.value;
    // if (createCharacterValues !== undefined) {
    //     const body = JSON.parse(createCharacterValues);
    //     const { id } = await createCharacter(body, accessToken);
    //     cookies().delete('create-character');
    //     return redirect(`/character/${id}`);
    // }

    return redirect(`/${memberId}`);
}
