import CharacterDetailPage from '@/app/(routes)/character/[id]/page';
import render from './setups/render';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';
import getMember, { checkIsLoggedIn } from '@/services/auth/getMember';
import { redirect } from 'next/navigation';
import { act, screen, waitFor } from '@testing-library/react';
import Header from '@/app/(routes)/character/[id]/_components/header';
import { Suspense } from 'react';
import { removeCharacterName } from '@/services/character/deleteCharacterName';
import editCharacterName from '@/services/character/editCharacterName';

const pushFn = vi.fn();
const refreshFn = vi.fn();

vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
        ...actual,
        useRouter: () => ({ push: pushFn, refresh: refreshFn }),
        usePathname: () => 'chracter/5',
        redirect: vi.fn(),
        useSearchParams: () => ({ get: () => vi.fn() }),
    };
});

vi.mocked(getMember).mockResolvedValue({ memberId: 2, characterCount: 3, memoCount: 5 });
vi.mocked(getCharacterDetail).mockResolvedValue({
    id: 5,
    name: '테스트 캐릭터',
    level: 4,
    totalExp: 2,
    currentExp: 2,
    nextExp: 12,
    characterImage:
        'https://anotherme.today/_next/image?url=https%3A%2F%2Fkr.object.ncloudstorage.com%2Fkekeche-character%2Fitem%2F0.webp&w=750&q=100',
    itemImage:
        'https://anotherme.today/_next/image?url=https%3A%2F%2Fkr.object.ncloudstorage.com%2Fkekeche-character%2Fitem%2F0.webp&w=750&q=100', // NOTE: 아이템 선택 안한 경우, 해당 필드가 없을 수 있음.
    keywords: [1, 2, 3],
});
vi.mocked(getCharacterSpecialty).mockResolvedValue({
    specialties: [{ id: 1, content: '테스트하기', memoCnt: 3 }],
});
vi.mocked(getCharacterMemos).mockResolvedValue({
    memos: [],
    totalPages: 1,
    totalCount: 1,
    page: 1,
    size: 1,
    has_next: false,
    has_previous: false,
    isFirstPage: true,
    isLastPage: true,
});

describe('로그인 안한 경우', () => {
    it('홈 페이지로 리다이렉트 합니다.', async () => {
        vi.mocked(checkIsLoggedIn).mockResolvedValue({ isLoggedIn: false });
        await act(async () => {
            render(<Suspense>{await CharacterDetailPage({ params: { id: 2 } })}</Suspense>);
        });
        expect(redirect).toHaveBeenNthCalledWith(1, '/');
    });
});

describe('Header', () => {
    it('헤더가 올바르게 렌더링 됩니다.', async () => {
        render(<Header />);

        waitFor(() => {
            const text = screen.getByText('성장 기록지');
            expect(text).toBeInTheDocument();
        });
    });
    it('캐릭터를 삭제합니다.', async () => {
        const { user } = await render(<Header />);

        /**
         * 1. 미트볼 클릭
         * 2. 팝오버에서 '삭제 클릭'
         * 3. 다이얼로그에서 '삭제' 클릭
         */

        await waitFor(async () => {
            const meatballIcon = screen.getByTestId('meatball-icon');
            await user.click(meatballIcon);
            const popoverDeleteText = screen.getByText('삭제');
            await user.click(popoverDeleteText);
            const dialogDeleteText = screen.getByRole('button', { name: '삭제' });
            expect(dialogDeleteText).toBeInTheDocument();
            await user.click(dialogDeleteText);
            expect(removeCharacterName).toHaveBeenCalled();
        });
    });
});
