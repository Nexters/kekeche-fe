'use client';

import { DialogHeader, DialogFooter } from '@/components/ui-shadcn/dialog';
import { toast } from '@/components/ui-shadcn/toast/use-toast';
import TopBar from '@/components/ui/top-bar';
import ROUTES from '@/constants/route';
import removeCharacterName from '@/services/character/deleteCharacterName';
import editCharacterName from '@/services/character/editCharacterName';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@radix-ui/react-dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import { useMutation, useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import getMember from '@/services/auth/getMember';
import React, { useState } from 'react';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import MeatballIcon from '@/assets/icons/meatball_20x20.svg';
import PencilIcon from '@/assets/icons/pencil_24x24.svg';
import TrashIcon from '@/assets/icons/trash_24x24.svg';

export default React.memo(function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const queryClient = useQueryClient();

    const characterId = Number(pathname.split('character/')[1]);

    const [{ data: member }, { data: character }] = useSuspenseQueries({
        queries: [
            {
                queryKey: ['auth'],
                queryFn: () => getMember({ accessToken: `${getCookie('accessToken')}` }),
            },
            {
                queryKey: ['character', characterId],
                queryFn: () => getCharacterDetail({ accessToken: `${getCookie('accessToken')}`, characterId }),
                staleTime: 1000 * 60 * 5,
            },
        ],
    });
    const [draft, setDraft] = useState(character.name);

    const { mutate: mutateName } = useMutation({
        mutationFn: () =>
            editCharacterName({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
                characterName: draft,
            }),
        onMutate: () => {
            queryClient.invalidateQueries({ queryKey: ['character', characterId] });
        },
    });

    return (
        <TopBar>
            <TopBar.Left>
                <button
                    onClick={() => {
                        router.push(ROUTES.characters(member.memberId));
                    }}
                    aria-label="뒤로 가기 버튼"
                    className="p-3"
                >
                    <BackArrowIcon fill="#3D4350" />
                </button>
            </TopBar.Left>
            <TopBar.Text>성장 기록지</TopBar.Text>
            <TopBar.Right>
                <Popover modal>
                    <PopoverTrigger className="p-3">
                        <MeatballIcon />
                    </PopoverTrigger>
                    <PopoverContent className="shadow-[0_4px_16px_0_rgba(0, 0, 0, 0.16)] mr-3 w-fit rounded-[8px] border-none p-3">
                        <Dialog>
                            <DialogTrigger className="flex items-center gap-1">
                                <PencilIcon stroke="#4B4F58" />
                                <span className="text-semibold16 text-gray-600">수정</span>
                            </DialogTrigger>
                            <DialogContent className="w-[300px] px-6 py-9">
                                <DialogHeader>
                                    <DialogTitle className="mb-5 text-center">이름 수정</DialogTitle>
                                    <DialogDescription className="flex justify-center">
                                        <input
                                            className="h-[48px] w-full rounded-lg px-4 outline outline-[#E8EAEE]"
                                            value={draft}
                                            onChange={(e) => {
                                                setDraft(e.target.value);
                                            }}
                                        />
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex gap-3">
                                    <DialogClose className="flex-1  rounded-xl bg-gray-200 py-3">취소</DialogClose>
                                    <DialogClose
                                        disabled={!draft || draft.length > 6}
                                        onClick={() => mutateName}
                                        className="flex-1 rounded-xl bg-[#606fd8] py-3 text-white disabled:bg-[#c4caf8]"
                                    >
                                        완료
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <div className="mx-[-12px] my-1 h-[1px] bg-gray-200" />
                        <Dialog>
                            <DialogTrigger className="flex items-center gap-1">
                                <TrashIcon stroke="#F04141" />
                                <span className="text-semibold16 text-[#F04141]">삭제</span>
                            </DialogTrigger>
                            <DialogContent className="w-[300px] px-6 py-9">
                                <DialogHeader>
                                    <DialogTitle className="mb-5 text-center">캐릭터를 삭제할까요?</DialogTitle>
                                    <DialogDescription className="text-center">
                                        삭제한 캐릭터는 되돌릴 수 없어요
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex gap-3">
                                    <DialogClose className="flex-1  rounded-xl bg-gray-200 py-3">취소</DialogClose>
                                    <DialogClose
                                        disabled={!draft || draft.length > 6}
                                        onClick={() => {
                                            if (member?.characterCount && member?.characterCount === 1) {
                                                toast({
                                                    description: '마지막 캐릭터는 삭제할 수 없어요',
                                                });
                                                return;
                                            }
                                            if (character?.id)
                                                removeCharacterName({
                                                    accessToken: `${getCookie('accessToken')}`,
                                                    characterId: character?.id,
                                                });
                                            location.reload();
                                            router.push(`/${member?.memberId}`);
                                        }}
                                        className="flex-1 rounded-xl  bg-[#f06371] py-3 text-white"
                                    >
                                        삭제
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </PopoverContent>
                </Popover>
            </TopBar.Right>
        </TopBar>
    );
});
