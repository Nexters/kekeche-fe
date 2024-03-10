import Home from '@/app/page';
import render from '@/__tests__/setups/render';
import { screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { IsLoggedIn, Member, checkIsLoggedIn } from '@/services/auth/getMember';

vi.mock('@/services/auth/getMember');

describe('홈 페이지 테스트', () => {
    it('로그인 안했을 때 홈 페이지를 렌더링 합니다.', async () => {
        vi.mocked(checkIsLoggedIn).mockResolvedValue({ isLoggedIn: false });
        render(await Home());
        const button = screen.getByText('로그인하기');

        expect(button).toBeInTheDocument();
    });

    it('로그인 했을 때는 유저의 홈으로 리다이렉트 합니다.', async () => {
        const member: Member = { memberId: 2, characterCount: 2, memoCount: 3 };

        vi.mocked(checkIsLoggedIn).mockResolvedValue({ isLoggedIn: true, member });

        vi.mock('next/navigation', () => {
            return {
                redirect: vi.fn(),
            };
        });

        render(await Home());

        expect(redirect).toHaveBeenCalledWith(`member/${member.memberId}`);
    });
});
