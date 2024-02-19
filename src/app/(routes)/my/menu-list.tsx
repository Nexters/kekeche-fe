'use client';

import ChevronRightIcon from '@/assets/icons/chevron-right_20x20.svg';
import { Button } from '@/components/ui-shadcn/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui-shadcn/dialog';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';
import ROUTES from '@/constants/route';
import { useA2HS } from '@/hooks/useA2HS';
import useIsIos from '@/hooks/useIsIos';
import deregister from '@/services/auth/deregister';
import { Member } from '@/services/auth/getMember';
import { sendGTMEvent } from '@next/third-parties/google';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface Props {
    member: Member;
}

export default function MenuList({ member }: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const { deferredPrompt } = useA2HS();
    const { isIos, showInstall: showIosInstall } = useIsIos();

    const showInstall = !!deferredPrompt || showIosInstall;
    const install = () => {
        if (!isIos) {
            //@ts-ignore
            deferredPrompt?.prompt();
            return;
        }

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
        return;
    };

    return (
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
                <Dialog>
                    <DialogTrigger className="flex w-full items-center justify-between p-6">
                        <span className="text-regular16 text-[#4B4F58]">회원탈퇴</span>
                        <ChevronRightIcon />
                    </DialogTrigger>
                    <DialogContent className="grid w-[296px] items-center rounded-[20px]">
                        <DialogHeader className="pt-4">
                            <DialogTitle className="text-center">회원탈퇴 하시겠습니까?</DialogTitle>
                            <DialogDescription className="text-center">
                                기존의 데이터가 모두 삭제됩니다.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="pb-4">
                            <div className="flex gap-3">
                                <DialogClose className="h-[48px] w-[118px] bg-[#eceff5] text-center text-semibold16 text-[#8b92a0]">
                                    취소
                                </DialogClose>
                                <Button
                                    onClick={async () => {
                                        await deregister({ accessToken: `${getCookie('accessToken')}` });
                                        deleteCookie('accessToken');
                                        router.push('/');
                                        router.refresh();
                                        sendGTMEvent({ event: 'deregister' });
                                    }}
                                    className="h-[48px] w-[118px] bg-[#ea2727] text-center text-semibold16 text-white"
                                >
                                    회원탈퇴
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </li>
        </ul>
    );
}
