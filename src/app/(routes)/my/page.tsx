'use client';

import ChevronRightIcon from '@/assets/icons/chevron-right_20x20.svg';
import { PageContainer } from '@/components/ui';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';
import getMember, { GetMemberResponse } from '@/services/getMember';
import { deleteCookie, getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function My() {
    const [memberResponse, setMemberResponse] = useState<GetMemberResponse | undefined>(undefined);
    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        getMember({ accessToken: getCookie('accessToken') }).then((res) => setMemberResponse(res));
    }, []);

    const { toast } = useToast();

    return (
        <PageContainer hasNavigator>
            <div className="mb-2 px-6 py-2 text-bold24">내 정보</div>
            <section>
                <div className="flex h-[100px] justify-between gap-3 px-6 py-3">
                    <div className="grid h-full min-w-[160px] flex-1  place-items-center rounded-xl bg-[#F7F8F9] px-6 py-4">
                        <span className="text-regular14 text-[#3D4350]">총 캐릭터</span>
                        <span className="text-semibold16 text-[#17171B]">{memberResponse?.characterCount ?? 0}개</span>
                    </div>
                    <div className="grid h-full min-w-[160px] flex-1  place-items-center rounded-xl bg-[#F7F8F9] px-6 py-4">
                        <span className="text-regular14 text-[#3D4350]">총 기록</span>
                        <span className="text-semibold16 text-[#17171B]">{memberResponse?.memoCount ?? 0}개</span>
                    </div>
                </div>
            </section>
            <div className="h-3 bg-[#F7F8F9]" role="presentation" />
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="https://forms.gle/S5ARuAhkL8tr9QeU8"
                        className="flex w-full items-center justify-between p-6"
                    >
                        <span className="text-regular16 text-[#4B4F58]">의견 보내기</span>
                        <ChevronRightIcon />
                    </a>
                </li>
                <li>
                    <button
                        onClick={async () => {
                            const shareData = {
                                title: '다양한 나를 키우는 AnotherMe',
                                text: '나의 캐릭터별 성장기록 서비스',
                                url: `${location.origin}/${memberResponse?.memberId}`,
                            };

                            if (navigator.canShare && navigator.canShare(shareData)) {
                                navigator.share(shareData);
                            } else {
                                toast({
                                    description: 'URL이 클립보드에 복사되었어요.',
                                });
                            }
                        }}
                        className="flex w-full items-center justify-between p-6"
                    >
                        <span className="text-regular16 text-[#4B4F58]">친구 초대하기</span>
                        <ChevronRightIcon />
                    </button>
                </li>
                <li>
                    <button className="flex w-full items-center justify-between p-6">
                        <span className="text-regular16 text-[#4B4F58]">만든 사람</span>
                        <ChevronRightIcon />
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            deleteCookie('accessToken');
                            router.push('/');
                        }}
                        className="flex w-full items-center justify-between p-6"
                    >
                        <span className="text-regular16 text-[#4B4F58]">로그아웃</span>
                        <ChevronRightIcon />
                    </button>
                </li>
                <li>
                    <button className="flex w-full items-center justify-between p-6">
                        <span className="text-regular16 text-[#4B4F58]">회원탈퇴</span>
                        <ChevronRightIcon />
                    </button>
                </li>
            </ul>
        </PageContainer>
    );
}
