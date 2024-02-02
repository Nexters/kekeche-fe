import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { login } from '../../redirect/route';
import { createCharacter } from '@/components/create-character/steps/show-result';

interface LoginResponse {
    memberId: number;
    nickname: string;
    accessToken: string;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    console.log('ddd');

    if (!code) throw new Error('요청에 문제 있음');

    // 로그인 로직
    const { memberId, accessToken } = await login(code);
    cookies().set('accessToken', accessToken, { maxAge: 1000000, httpOnly: false });

    // 캐릭터 생성
    const createCharacterValues = cookies().get('create-character')?.value as string;
    console.log(JSON.parse(createCharacterValues));
    await createCharacter(createCharacterValues, accessToken);

    return redirect(`/${memberId}`);
}
