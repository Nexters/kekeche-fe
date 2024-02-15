'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui-shadcn/alert-dialog';
import createMemo, { CreateMemoResponse } from '@/services/memo/createMemo';
import { useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { CreateMemoContext } from './create-memo-context';

export default function Header() {
    const router = useRouter();
    const context = useContext(CreateMemoContext);
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [character, setCharacter] = useState<CreateMemoResponse | undefined>(undefined);

    if (!context) return;
    //TODO: 레벨업 모달
    return (
        <header className="mb-[10px] flex justify-between gap-2">
            <button
                onClick={() => {
                    router.back();
                }}
                aria-label="뒤로 가기 버튼"
                className="p-3"
            >
                <BackArrowIcon stroke="#8E939E" />
            </button>
            <span className=" grid flex-1 place-items-center text-center text-[18px] font-semibold leading-7 text-gray-500">
                기록 작성
            </span>
            <button
                onClick={async () => {
                    setLoading(true);
                    const res = await createMemo({
                        accessToken: `${getCookie('accessToken')}`,
                        content: context.content,
                        characterId: Number(context.selectedCharacterId),
                        specialtyIds: context?.keywords ?? [],
                    });
                    await queryClient.invalidateQueries({ queryKey: ['allMemos'] });
                    await queryClient.invalidateQueries({
                        queryKey: ['character', 'memos', Number(context.selectedCharacterId)],
                    });

                    if (res?.isLevelUp) {
                        setShowDialog(true);
                        setCharacter(res);
                        return;
                    }

                    router.push(`/memos`);
                    router.refresh();
                }}
                disabled={context?.content.length === 0 || !context?.selectedCharacterId || loading}
                className="p-3 text-semibold16 text-[#1E73F3] transition-colors disabled:pointer-events-none disabled:text-gray-300"
            >
                저장
            </button>
            {
                <AlertDialog open={showDialog}>
                    <AlertDialogContent className="w-[328px] border-0 px-0 py-9">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-center">Lv.3</AlertDialogTitle>
                            <AlertDialogDescription className="border0-">
                                <Image
                                    src={character?.characterImage || ''}
                                    alt={character?.name || ''}
                                    width={328}
                                    height={300}
                                />
                                {character?.name}
                                {character?.keywords.map((keyword) => {
                                    return <div key={keyword}>{keyword}</div>;
                                })}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction
                                className="w-full bg-[#2777ea] py-6 text-white"
                                onClick={() => {
                                    router.push(`/character/${character?.id}`);
                                    router.refresh();
                                }}
                            >
                                확인
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }
        </header>
    );
}
