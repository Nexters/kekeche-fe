import CharacterDetailPage from '@/app/(routes)/character/[id]/page';
import render from './setups/render';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';
import getMember, { checkIsLoggedIn } from '@/services/auth/getMember';
import { redirect } from 'next/navigation';
import { act, screen, within } from '@testing-library/react';
import Header from '@/app/(routes)/character/[id]/_components/header';
import { removeCharacterName } from '@/services/character/deleteCharacterName';
import editCharacterName from '@/services/character/editCharacterName';
import { UserEvent } from '@testing-library/user-event';

const pushFn = vi.fn();
const refreshFn = vi.fn();

vi.mock('cookies-next', () => ({
    getCookie: () => {
        return 'accessToken';
    },
}));

vi.mock('next/navigation', async () => {
    return {
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
            render(await CharacterDetailPage({ params: { id: 2 } }));
        });
        expect(redirect).toHaveBeenNthCalledWith(1, '/');
    });
});

describe('Header', () => {
    let user: UserEvent | undefined;

    beforeEach(async () => {
        const { user: userEvent } = await render(<Header />);
        user = userEvent;
    });

    it('헤더가 올바르게 렌더링 됩니다.', async () => {
        const text = await screen.findByText('성장 기록지');

        expect(text).toBeInTheDocument();
    });

    it('캐릭터를 삭제합니다.', async () => {
        if (user === undefined) return;

        /**
         * 1. 미트볼 클릭
         * 2. 팝오버에서 '삭제' 클릭
         * 3. 다이얼로그에서 '삭제' 클릭
         */

        const meatballIcon = screen.getByTestId('meatball-icon');
        await user.click(meatballIcon);
        const popoverDeleteText = screen.getByText('삭제');
        await user.click(popoverDeleteText);
        const dialogDeleteText = screen.getByRole('button', { name: '삭제' });
        expect(dialogDeleteText).toBeInTheDocument();
        await user.click(dialogDeleteText);
        expect(removeCharacterName).toHaveBeenCalledWith({ accessToken: 'accessToken', characterId: 5 });
    });

    it('캐릭터 이름 수정합니다.', async () => {
        if (user === undefined) return;

        /**
         * 1. 미트볼 클릭
         * 2. 팝오버에서 '수정' 클릭
         * 3. 다이얼로그에서 input 클릭
         * 4. input clear 후 새로운 이름 입력
         * 5. '완료' 클릭
         */

        const meatballIcon = screen.getByTestId('meatball-icon');
        await user.click(meatballIcon);
        const popoverEditText = screen.getByText('수정');
        await user.click(popoverEditText);
        const dialog = screen.getByRole('dialog');
        const input = screen.getByRole('textbox');
        await user.click(input);
        await user.clear(input);
        await user.type(input, '새로운 이름');
        const confirmButton = within(dialog).getByRole('button', { name: '완료' });
        await user.click(confirmButton);

        expect(editCharacterName).toHaveBeenCalledWith({
            accessToken: 'accessToken',
            characterId: 5,
            characterName: '새로운 이름',
        });
    });
});
