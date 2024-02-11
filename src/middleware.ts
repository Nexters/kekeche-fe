import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import ROUTES from './constants/route';
import { ResponseBody } from './types/response-body';

const HOME_PATH = '/';
const AUTH_PATHS = ['/character', '/memos', '/my']; // 권한이 필요한 페이지들

interface MemberInfo {
    memberId: number;
    characterCount: number;
    memoCount: number;
}

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;

    const getMember = async () =>
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/member`, {
            headers: {
                Authorization: `${accessToken}`,
            },
        });

    // 홈 진입
    if (request.nextUrl.pathname === HOME_PATH) {
        const response = await getMember();
        if (response.status === 401) return NextResponse.next(); // 유효하지 않은 토큰인 경우

        const {
            data: { memberId },
        }: ResponseBody<MemberInfo> = await response.json();

        return NextResponse.redirect(new URL(ROUTES.characters(memberId), request.url));
    }

    // 유저 인증이 필요한 페이지들 진입
    for (const path of AUTH_PATHS) {
        if (request.nextUrl.pathname.startsWith(path)) {
            try {
                await getMember().then((res) => res.json());
                return NextResponse.next();
            } catch (error) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
    }

    return NextResponse.next();
}
