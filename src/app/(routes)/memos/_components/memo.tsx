'use client';

import CharacterLabel from '@/components/character-label';
import deleteMemo from '@/services/memo/deleteMemo';
import { Memo } from '@/types/memo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import ActionButton from './action-button';
import { twMerge } from 'tailwind-merge';

type Props = {
    memo: Memo;
    className?: string;
};

export default function Memo({ memo: { content, createdAt, id, character, modified, specialties }, className }: Props) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: deleteMemos } = useMutation({
        mutationFn: () =>
            deleteMemo({
                accessToken: `${getCookie('accessToken')}`,
                memoId: id,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allMemos'] });
            queryClient.invalidateQueries({ queryKey: ['character', 'memos', character.id] });
        },
    });

    return (
        <div
            className={twMerge(
                'flex h-auto w-full flex-col  gap-[12px] rounded-[16px] bg-white px-[24px] pb-[24px] pt-[10px] shadow-[0px_8px_24px_rgba(149,157,165,0.13)]',
                className,
            )}
        >
            <div className="flex items-center justify-between ">
                <CharacterLabel character={character} />
                <ActionButton
                    onClick={deleteMemos}
                    onEdit={() => {
                        router.push(`?edit=${id}`);
                    }}
                />
            </div>
            <div className="text-regular16 leading-[24divx] text-[#4B4F58]">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            {specialties.length > 0 && (
                <ul className=" mt-[12px] flex h-auto w-full flex-wrap  gap-[8px] ">
                    {specialties.map(({ id, content }) => (
                        <li
                            className="font-600 h-[30px] rounded-full bg-[#E0ECFF] px-[12px] py-[6px] text-[12px] text-[#2777EA]"
                            key={id}
                        >
                            {content}
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-[16px] w-full text-right text-regular14 text-[#8E939E]">
                {dayjs(createdAt).format('YYYY. MM. DD')} {modified && '(수정 됨)'}
            </div>
        </div>
    );
}
