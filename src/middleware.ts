import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import getMember from './services/auth/getMember';
import { ResponseBody } from './types/response-body';

const HOME_PATH = '/';
const AUTH_PATHS = ['/characters', '/memos', '/my'];

interface MemberInfo {
    memberId: number;
    characterCount: number;
    memoCount: number;
}

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (request.nextUrl.pathname === HOME_PATH) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/member`, {
            headers: {
                Authorization: `${accessToken}`,
            },
        });
        if (response.status === 401) return NextResponse.next(); // 유효하지 않은 토큰인 경우

        const {
            data: { memberId },
        }: ResponseBody<MemberInfo> = await response.json();

        return NextResponse.redirect(new URL(`/${memberId}`, request.url));
    }

    for (const path of AUTH_PATHS) {
        if (request.nextUrl.pathname.startsWith(path)) {
            const member = await getMember({ accessToken });
            if (!member) NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path',
};
