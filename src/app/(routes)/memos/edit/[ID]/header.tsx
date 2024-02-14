'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import editMemo from '@/services/memo/editMemo';
import { useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CreateMemoContext } from './create-memo-context';

export default function Header() {
    const router = useRouter();
    const context = useContext(CreateMemoContext);
    const queryClient = useQueryClient();

    if (!context) return;

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
                    await editMemo({
                        accessToken: `${getCookie('accessToken')}`,
                        content: context.content,
                        specialtyIds: context?.keywords ?? [],
                    });
                    await queryClient.invalidateQueries({ queryKey: ['allMemos'] });
                    await queryClient.invalidateQueries({
                        queryKey: ['character', 'memos', Number(context.selectedCharacterId)],
                    });
                    router.push(`/memos`);
                    router.refresh();
                }}
                disabled={context?.content.length === 0 || !context?.selectedCharacterId}
                className="p-3 text-semibold16 text-[#1E73F3] transition-colors disabled:pointer-events-none disabled:text-gray-300"
            >
                저장
            </button>
        </header>
    );
}
