import { createCharacter } from '@/components/create-character/steps/show-result';
import ROUTES from '@/constants/route';
import { login } from '@/services/auth/login';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) throw new Error('요청에 문제 있음');

    const res = await login(code);

    console.log('응답', res);

    return NextResponse.redirect(new URL('/', request.url));

    // cookies().set('accessToken', accessToken, { maxAge: 1000000, httpOnly: false });

    // // 캐릭터 생성
    // const createCharacterValues = cookies().get('create-character')?.value;
    // if (createCharacterValues !== undefined) {
    //     const body = JSON.parse(createCharacterValues);
    //     const { id } = await createCharacter(body, accessToken);
    //     cookies().delete('create-character');
    //     return redirect(ROUTES.characters(memberId));
    // }

    // return redirect(ROUTES.characters(memberId));
}
