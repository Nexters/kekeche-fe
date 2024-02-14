'use client';

import ChevronRightIcon from '@/assets/icons/chevron-right_20x20.svg';
import { Button } from '@/components/ui-shadcn/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui-shadcn/dialog';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';
import ROUTES from '@/constants/route';
import { Member } from '@/services/auth/getMember';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface Props {
    member: Member;
}

export default function MenuList({ member }: Props) {
    const router = useRouter();
    const { toast } = useToast();

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
                            url: `${location.origin}/${ROUTES.characters(member.memberId)}`,
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
                <button
                    onClick={() => {
                        toast({
                            description: '준근 태환 윤서 경리 순영 은솔 만세 ✋',
                        });
                    }}
                    className="flex w-full items-center justify-between p-6"
                >
                    <span className="text-regular16 text-[#4B4F58]">만든 사람</span>
                    <ChevronRightIcon />
                </button>
            </li>
            <li>
                <button
                    onClick={() => {
                        deleteCookie('accessToken');
                        router.replace('/');
                        router.refresh();
                    }}
                    className="flex w-full items-center justify-between p-6"
                >
                    <span className="text-regular16 text-[#4B4F58]">로그아웃</span>
                    <ChevronRightIcon />
                </button>
            </li>
            <li>
                <Dialog>
                    <DialogTrigger onClick={() => {}} className="flex w-full items-center justify-between p-6">
                        <span className="text-regular16 text-[#4B4F58]">회원탈퇴</span>
                        <ChevronRightIcon />
                    </DialogTrigger>
                    <DialogContent className="grid h-[232px] w-[296px] items-center rounded-[20px]">
                        <DialogHeader>
                            <DialogTitle className="text-center">회원탈퇴 하시겠습니까?</DialogTitle>
                            <DialogDescription className="text-center">
                                기존의 데이터가 모두 삭제됩니다.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mx-auto">
                            <Button className="h-[48px] w-[118px] bg-[#eceff5] text-center text-semibold16 text-[#8b92a0]">
                                취소
                            </Button>
                            <Button className="h-[48px] w-[118px] bg-[#ea2727] text-center text-semibold16 text-white">
                                회원탈퇴
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </li>
        </ul>
    );
}
