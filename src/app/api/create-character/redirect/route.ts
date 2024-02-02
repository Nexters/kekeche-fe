import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createCharacter } from '@/components/create-character/steps/show-result';
import { login } from '@/services/login';

interface LoginResponse {
    memberId: number;
    nickname: string;
    accessToken: string;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) throw new Error('요청에 문제 있음');

    // 로그인 로직
    const { memberId, accessToken } = await login(code);
    cookies().set('accessToken', accessToken, { maxAge: 1000000, httpOnly: false });
    console.log('accessToken', accessToken);
    // 캐릭터 생성
    const createCharacterValues = cookies().get('create-character')?.value;
    if (createCharacterValues !== undefined) {
        const body = JSON.parse(createCharacterValues);
        const { id } = await createCharacter(body, accessToken);
        console.log(id);
        cookies().delete('create-character');
        return redirect(`/character/${id}`);
    }

    return redirect(`/${memberId}`);
}
