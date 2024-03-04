'use client';

import ChevronRightIcon from '@/assets/icons/chevron-right_20x20.svg';
import Dialog from '@/components/dialog';
import AlertDialog from '@/components/dialog/alert-dialog';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';
import ROUTES from '@/constants/route';
import { useA2HS } from '@/hooks/useA2HS';
import useIsIos from '@/hooks/useIsIos';
import deregister from '@/services/auth/deregister';
import { Member } from '@/services/auth/getMember';
import { sendGTMEvent } from '@next/third-parties/google';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
    member: Member;
}

export default function MenuList({ member }: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const { deferredPrompt } = useA2HS();
    const { isIos, showInstall: showIosInstall } = useIsIos();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

    const showInstall = !!deferredPrompt || showIosInstall;
    const install = () => {
        if (isIos()) {
            setIsModalOpen(true);
            return;
        }

        //@ts-ignore
        deferredPrompt?.prompt();
        return;
    };

    return (
        <>
            <ul>
                {showInstall && (
                    <li>
                        <button onClick={install} className="flex w-full items-center justify-between p-6">
                            <span className="text-regular16 text-[#4B4F58]">앱 설치하기</span>
                            <ChevronRightIcon />
                        </button>
                    </li>
                )}
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
                                url: `${location.origin}${ROUTES.characters(member.memberId)}`,
                            };

                            if (navigator.canShare && navigator.canShare(shareData)) {
                                navigator.share(shareData);
                            } else {
                                toast({
                                    description: 'URL이 클립보드에 복사되었어요.',
                                });
                            }
                            sendGTMEvent({ event: 'clickShare' });
                        }}
                        className="flex w-full items-center justify-between p-6"
                    >
                        <span className="text-regular16 text-[#4B4F58]">친구 초대하기</span>
                        <ChevronRightIcon />
                    </button>
                </li>

                <li>
                    <a
                        target="_blank"
                        href="https://www.instagram.com/anotherme_official"
                        className="flex w-full items-center justify-between p-6"
                    >
                        <span className="text-regular16 text-[#4B4F58]">만든 사람</span>
                        <ChevronRightIcon />
                    </a>
                </li>
                <li>
                    <button
                        onClick={() => {
                            deleteCookie('accessToken');
                            router.replace('/');
                            router.refresh();
                            sendGTMEvent({ event: 'logout' });
                        }}
                        className="flex w-full items-center justify-between p-6"
                    >
                        <span className="text-regular16 text-[#4B4F58]">로그아웃</span>
                        <ChevronRightIcon />
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setIsDeleteAccountModalOpen(true)}
                        className="flex w-full items-center justify-between p-6"
                    >
                        <span className="text-regular16 text-[#4B4F58]">회원탈퇴</span>
                        <ChevronRightIcon />
                    </button>
                </li>
            </ul>
            <Dialog
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                title="이렇게 설치해주세요!"
                leftText="취소"
                rightText="확인"
                contents={
                    <ul className="ml-0 mt-[24px] flex flex-col gap-[8px] text-left">
                        <li>{'1. 사파리 하단에 공유 버튼 클릭'}</li>
                        <li>{'2. "홈 화면에 추가" 메뉴 선택'}</li>
                        <li>{'3. 앱 이름 확인'}</li>
                        <li>{'4. 추가 버튼 클릭'}</li>
                    </ul>
                }
            />
            <AlertDialog
                open={isDeleteAccountModalOpen}
                onOpenChange={setIsDeleteAccountModalOpen}
                title="회원탈퇴 하시겠습니까?"
                description="기존의 데이터가 모두 삭제됩니다."
                leftText="취소"
                rightText="삭제"
                onConfirm={async () => {
                    await deregister({ accessToken: `${getCookie('accessToken')}` });
                    deleteCookie('accessToken');
                    router.push('/');
                    router.refresh();
                    sendGTMEvent({ event: 'deregister' });
                }}
            />
        </>
    );
}
