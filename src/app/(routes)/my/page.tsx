import { PageContainer } from '@/components/ui';
import ROUTES from '@/constants/route';
import CookieManager from '@/lib/utils-cookie';
import getMember from '@/services/auth/getMember';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import MenuList from './menu-list';

export default async function My() {
    const member = await getMember({ accessToken: CookieManager.getServerAccessToken() });

    if (!member) {
        redirect('/');
    }

    return (
        <PageContainer hasNavigator>
            <div className="mb-2 px-6 py-2 text-bold24">내 정보</div>
            <section>
                <div className="flex h-[100px] justify-between gap-3 px-6 py-3">
                    <Link
                        href={`${ROUTES.characters(member.memberId)}`}
                        className="grid h-full min-w-[160px] flex-1  place-items-center rounded-xl bg-[#F7F8F9] px-6 py-4"
                    >
                        <span className="text-regular14 text-[#3D4350]">총 캐릭터</span>
                        <span className="text-semibold16 text-[#17171B]">{member.characterCount ?? 0}개</span>
                    </Link>
                    <Link
                        href={ROUTES.memos}
                        className="grid h-full min-w-[160px] flex-1  place-items-center rounded-xl bg-[#F7F8F9] px-6 py-4"
                    >
                        <span className="text-regular14 text-[#3D4350]">총 기록</span>
                        <span className="text-semibold16 text-[#17171B]">{member.memoCount ?? 0}개</span>
                    </Link>
                </div>
            </section>
            <div className="h-3 bg-[#F7F8F9]" role="presentation" />
            <MenuList member={member} />
        </PageContainer>
    );
}
