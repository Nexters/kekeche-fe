import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    console.log(code);
    return redirect('/');
}

const login = async (code: string) => {
    const response = await fetch(`${process.env.SERVER_BASE_URL}/api/v1/member/kakao/callback?code=${code}`);
    const data = await response.json();
    return data;
};
