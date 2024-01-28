'use client';
import Image from 'next/image';
import KakaoLogo from '@/assets/images/kakao-logo.png';
import { getCookie } from 'cookies-next';

type Props = {
    callbackUrl: string;
};

const test = '/api/v1/memo/character/1?page=0&size=20&sort=createdAt,DESC';
const test1 = '/api/v1/memo?page=0&size=20&sort=createdAt,DESC';
export default function KakaoLoginButton({ callbackUrl }: Props) {
    const handleClick = async () => {
        // window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${callbackUrl}`;
        const accessToken = getCookie('accessToken');
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${test}`, {
            cache: 'no-cache',
            headers: {
                Authorization: `${accessToken}`,
            },
        });
        console.log(response.json());
    };

    return (
        <button
            className="flex h-[56px] w-[343px] items-center justify-center rounded-[12px] bg-[#FEE500]"
            onClick={handleClick}
        >
            <Image src={KakaoLogo} width={36} height={36} alt="카카오 로고" />
            <span className="text-bold16 text-[#323541]">카카오로 로그인</span>
        </button>
    );
}
