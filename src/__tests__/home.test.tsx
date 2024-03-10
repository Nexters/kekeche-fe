import Home from '@/app/page';
import render from '@/__tests__/setups/render';
import { screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { IsLoggedIn, checkIsLoggedIn } from '@/services/auth/getMember';

vi.mock('next/headers', async () => {
    return {
        cookies: () => {
            return {
                get: (name: string) => {
                    return {
                        value: 'cookie',
                    };
                },
            };
        },
    };
});
vi.mock('@/services/auth/getMember');

describe('홈 페이지 테스트', () => {
    it('로그인 안했을 때 홈 페이지를 렌더링 합니다.', async () => {
        vi.mocked(checkIsLoggedIn).mockReturnValue(Promise.resolve({ isLoggedIn: true }));
        render(await Home());
        const button = screen.getByText('로그인하기');

        expect(button).toBeInTheDocument();
    });

    it('로그인 했을 때는 유저의 홈으로 리다이렉트 합니다.', async () => {
        const member = { memberId: 2 };
        vi.mocked(checkIsLoggedIn).mockReturnValue(
            Promise.resolve({ isLoggedIn: true, member }) as Promise<IsLoggedIn>,
        );

        vi.mock('next/navigation', async () => {
            return {
                redirect: vi.fn(),
            };
        });

        render(await Home());

        expect(redirect).toHaveBeenCalledWith(`member/${member.memberId}`);
    });
});
