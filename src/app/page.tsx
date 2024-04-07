import HomeBg from '@/assets/images/homeBg.jpg';
import Logo from '@/assets/images/logo.png';
import Safe from '@/assets/images/safe.png';
import FixedBottomArea from '@/components/create-character/fixed-bottom-area';
import PageContainerV2 from '@/components/page-container-v2/page-container-v2';
import CtaButton from '@/components/ui/cta-button';
import { checkIsLoggedIn } from '@/services/auth/getMember';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
    const { isLoggedIn, member } = await checkIsLoggedIn({ accessToken: `${cookies().get('accessToken')?.value}` });
    if (isLoggedIn) redirect(`member/${member?.memberId}`);
    return (
        <PageContainerV2>
            <Image quality={100} priority alt={'홈 배경'} src={HomeBg} fill />
            <Image quality={100} alt={'safe'} src={Safe} width={540} height={100} className="absolute top-0 " />
            <div className="z-[2] mt-[200px] flex w-full justify-center">
                <Image quality={100} alt={'로고'} src={Logo} width={256} height={77} />
            </div>
            <FixedBottomArea className="mb-[31px] gap-[16px]">
                <Link href="/create">
                    <CtaButton text="내 캐릭터 만들기" />
                </Link>
                <div className="semibold-14 text-gray-400 ">
                    {'이미 도감이 있으면 '}
                    <a
                        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`}
                        className="text-[#445Aff] underline underline-offset-2"
                    >
                        로그인하기
                    </a>
                </div>
            </FixedBottomArea>
        </PageContainerV2>
    );
}
