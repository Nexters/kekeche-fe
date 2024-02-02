import CtaButton from '@/components/create-character/cta-button';
import FixedBottomArea from '@/components/create-character/fixed-bottom-area';
import { PageContainer } from '@/components/ui';
import Link from 'next/link';
import HomeBg from '@/assets/images/homeBg.jpg';
import Logo from '@/assets/images/logo.png';
import Image from 'next/image';

export default function Home() {
    return (
        <PageContainer>
            <Image alt={'홈 배경'} src={HomeBg} layout="fill" objectFit="fill" objectPosition="center" />
            <div className="z-[2] mt-[200px] flex w-full justify-center">
                <Image alt={'로고'} src={Logo} width={256} height={77} />
            </div>
            <FixedBottomArea
                className="mb-[31px] gap-[16px]"
                style={{ boxShadow: 'inset 0px -200px 200px -200px #ffffff' }}
            >
                <Link href="/create">
                    <CtaButton text="내 캐릭터 만들기" />
                </Link>
                <div className="semibold-14 text-gray-400 ">
                    {'이미 도감이 있으면 '}
                    <a className="text-[#445Aff] underline underline-offset-2">{'로그인하기'}</a>
                </div>
            </FixedBottomArea>
        </PageContainer>
    );
}
