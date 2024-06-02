'use client';

import ActionButtonPopover from '@/components/popover/action-button-popover';
import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import MeatballIcon from '@/assets/icons/meatball_20x20.svg';
import PencilIcon from '@/assets/icons/pencil_24x24.svg';
import TrashIcon from '@/assets/icons/trash_24x24.svg';
import Dialog from '@/components/dialog';
import AlertDialog from '@/components/dialog/alert-dialog';
import TopBar from '@/components/ui/top-bar';
import ROUTES from '@/constants/route';
import { removeCharacterName } from '@/services/character/deleteCharacterName';
import editCharacterName from '@/services/character/editCharacterName';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, useToast } from '@/components/ui-shadcn/toast/use-toast';
import { useCharacterDetailQueries } from '@/store/query/useCharacterDetailQueries';
import Link from 'next/link';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const queryClient = useQueryClient();

    const characterId = Number(pathname.split('character/')[1]);

    const [{ data: member }, { data: character }] = useCharacterDetailQueries(characterId);

    const { mutate: mutateName } = useMutation({
        mutationFn: () =>
            editCharacterName({
                accessToken: `${getCookie('accessToken')}`,
                characterId: character?.id,
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
                    <Link href={ROUTES.characters(member.memberId)} className="flex items-center justify-center p-3">
                        <BackArrowIcon fill="#3D4350" />
                    </Link>
                </TopBar.Left>
                <TopBar.Text>성장 기록지</TopBar.Text>
                <TopBar.Right>
                    <ActionButtonPopover
                        onEdit={() => setIsModifyModalOpen(true)}
                        onClick={() => setIsDeleteModalOpen(true)}
                    />
                </TopBar.Right>
            </TopBar>
            <Dialog
                open={isModifyModalOpen}
                onOpenChange={setIsModifyModalOpen}
                leftText="취소"
                rightText="완료"
                title="이름 수정"
                onConfirm={() => {
                    if (draft.length < 1 || draft.length > 10) {
                        toast({ description: '한글, 영문 대소문자. 공백 포함 최대 8글자로 입력해주세요.' });
                        return;
                    }
                    mutateName();
                }}
                contents={
                    <input
                        className="mt-[24px] h-[48px] w-full rounded-lg px-4 outline outline-newGray-200 focus:outline-primary-500"
                        value={draft}
                        onChange={(e) => {
                            setDraft(e.target.value);
                        }}
                        minLength={1}
                        maxLength={10}
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
}
