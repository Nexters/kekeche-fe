'use client';
import KakaoLogo from '@/assets/images/kakao-logo.png';
import { sendGTMEvent } from '@next/third-parties/google';
import Image from 'next/image';

type Props = {
    callbackUrl: string;
};

export default function KakaoLoginButton({ callbackUrl }: Props) {
    const handleLogin = async () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${callbackUrl}`;
        sendGTMEvent({ event: 'clickKakaoLogin' });
    };

    return (
        <button
            className="flex h-[56px] w-[343px] items-center justify-center rounded-[12px] bg-[#FEE500]"
            onClick={handleLogin}
        >
            <Image quality={100} src={KakaoLogo} width={36} height={36} alt="카카오 로고" />
            <span className="text-bold16 text-[#323541]">카카오로 로그인</span>
        </button>
    );
}
