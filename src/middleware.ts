import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ResponseBody } from './types/response-body';

const HOME_PATH = '/';

interface MemberInfo {
    memberId: number;
    characterCount: number;
    memoCount: number;
}

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (accessToken === undefined) return NextResponse.next();

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

    return NextResponse.next();
}

export const config = {
    matcher: '/:path',
};
