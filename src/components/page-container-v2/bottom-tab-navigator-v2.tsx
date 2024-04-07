import ROUTES from '@/constants/route';
import { NavigatorItem } from './navigator-item';
import { QueryClient } from '@tanstack/react-query';
import { memberQueryOptions } from '@/store/query/useCharacterDetailQueries';
import { cookies } from 'next/headers';

export const Menus = [
    { label: '홈', path: 'member/' },
    { label: '작성', path: `${ROUTES.memoCreate}` },
    { label: '기록', path: `${ROUTES.memos}` },
    { label: '내 정보', path: `${ROUTES.my}` },
] as const;

export async function BottomTabNavigatorV2() {
    const queryClient = new QueryClient();

    const memeberId = (await queryClient.ensureQueryData(memberQueryOptions(`${cookies().get('accessToken')?.value}`)))
        .memberId;

    return (
        <div className="border-top nav-bar sticky bottom-0 left-0 right-0 z-10 border-t border-t-[#E8EAEE] bg-white">
            <nav className="w-full">
                <ul className="relative flex justify-around">
                    {Menus.map((menuItem) => (
                        <NavigatorItem key={menuItem.path} menuItem={menuItem} memberId={memeberId} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}
