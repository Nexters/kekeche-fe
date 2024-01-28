import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const HOME_PATH = '/';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (request.nextUrl.pathname === HOME_PATH) {
        if (accessToken === undefined) return;

        // TODO: 토큰 존재하면, 유저 아이디 요청해서 해당 유저의 홈으로 리다이렉트
    }

    // 토큰 없으면 '/' 로 리다이렉트
    if (accessToken === undefined) return NextResponse.redirect(new URL('/', request.url));

    return NextResponse;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path',
};
