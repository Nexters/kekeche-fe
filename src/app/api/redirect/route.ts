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

    const { memberId, accessToken } = await login(code);

    cookies().set('accessToken', accessToken, { maxAge: 1000000, httpOnly: false });

    return redirect(ROUTES.characters(memberId));
}
