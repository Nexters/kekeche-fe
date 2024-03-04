'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import MeatballIcon from '@/assets/icons/meatball_20x20.svg';
import PencilIcon from '@/assets/icons/pencil_24x24.svg';
import TrashIcon from '@/assets/icons/trash_24x24.svg';
import Dialog from '@/components/dialog';
import AlertDialog from '@/components/dialog/alert-dialog';
import TopBar from '@/components/ui/top-bar';
import ROUTES from '@/constants/route';
import getMember from '@/services/auth/getMember';
import removeCharacterName from '@/services/character/deleteCharacterName';
import editCharacterName from '@/services/character/editCharacterName';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useMutation, useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
                queryKey: ['character', 'detail', characterId],
                queryFn: () => getCharacterDetail({ accessToken: `${getCookie('accessToken')}`, characterId }),
                staleTime: 1000 * 60 * 5,
            },
        ],
    });

    const { mutate: mutateName } = useMutation({
        mutationFn: () =>
            editCharacterName({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
                characterName: draft,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['character', 'detail', characterId] });
        },
    });

    const { mutate: deleteCharacter } = useMutation({
        mutationFn: () =>
            removeCharacterName({
                accessToken: `${getCookie('accessToken')}`,
                characterId: character?.id,
            }),
        onSuccess: () => {
            router.push(`/member/${member.memberId}`);
            router.refresh();
        },
    });

    const [draft, setDraft] = useState(character.name);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <>
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
                        <PopoverContent className="shadow-[0_4px_16px_0_rgba(0, 0, 0, 0.16)] translate-x-[-15px] rounded-[8px]  border-none bg-white p-3">
                            <button onClick={() => setIsModifyModalOpen(true)} className="flex items-center gap-1">
                                <PencilIcon className="fill-[#4B4F58]" />
                                <span className="text-semibold16 text-gray-600">수정</span>
                            </button>
                            <div className="mx-[-12px] my-1 h-[1px] bg-gray-200" />
                            <button onClick={() => setIsDeleteModalOpen(true)} className="flex items-center gap-1">
                                <TrashIcon stroke="#F04141" />
                                <span className="text-semibold16 text-[#F04141]">삭제</span>
                            </button>
                        </PopoverContent>
                    </Popover>
                </TopBar.Right>
            </TopBar>
            <Dialog
                open={isModifyModalOpen}
                onOpenChange={setIsModifyModalOpen}
                leftText="취소"
                rightText="완료"
                title="이름 수정"
                onConfirm={mutateName}
                contents={
                    <input
                        className="mt-[24px] h-[48px] w-full rounded-lg px-4 outline outline-newGray-200 focus:outline-primary-500"
                        value={draft}
                        onChange={(e) => {
                            setDraft(e.target.value);
                        }}
                    />
                }
            />

            <AlertDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={deleteCharacter}
                title="캐릭터 삭제"
                description="삭제한 캐릭터는 되돌릴 수 없어요."
                leftText="취소"
                rightText="삭제"
            />
        </>
    );
});
