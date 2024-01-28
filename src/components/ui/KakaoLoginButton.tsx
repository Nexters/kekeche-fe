import Image from 'next/image';
import KakaoLogo from '@/assets/images/kakao-logo.png';

export default function KakaoLoginButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="flex h-[56px] w-[343px] items-center justify-center rounded-[12px] bg-[#FEE500]" {...props}>
            <Image src={KakaoLogo} width={36} height={36} alt="카카오 로고" />
            <span className="text-bold16 text-[#323541]">카카오로 로그인</span>
        </button>
    );
}
