import HomeBg from '@/assets/images/homeBg.jpg';
import Logo from '@/assets/images/logo.png';
import Safe from '@/assets/images/safe.png';
import CtaButton from '@/components/create-character/cta-button';
import FixedBottomArea from '@/components/create-character/fixed-bottom-area';
import { PageContainer } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <PageContainer>
            <Image
                priority
                alt={'홈 배경'}
                src={HomeBg}
                fill
                style={{
                    objectFit: 'cover',
                }}
            />
            <Image alt={'safe'} src={Safe} width={400} height={80} className="absolute top-0 " />
            <div className="z-[2] mt-[200px] flex w-full justify-center">
                <Image alt={'로고'} src={Logo} width={256} height={77} />
            </div>
            <FixedBottomArea
                className="mb-[31px] gap-[16px]"
                // style={{ boxShadow: 'inset 0px -200px 200px -200px #ffffff' }}
            >
                <Link href="/create">
                    <CtaButton text="내 캐릭터 만들기" />
                </Link>
                <div className="semibold-14 text-gray-400 ">
                    {'이미 도감이 있으면 '}
                    <a
                        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`}
                        className="text-[#445Aff] underline underline-offset-2"
                    >
                        {'로그인하기'}
                    </a>
                </div>
            </FixedBottomArea>
        </PageContainer>
    );
}
