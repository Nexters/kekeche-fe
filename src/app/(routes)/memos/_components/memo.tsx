'use client';

import deleteMemo from '@/services/memo/deleteMemo';
import { Memo } from '@/types/memo';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import ActionButton from './action-button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CharacterLabel from '@/components/character-label';

type Props = {
    memo: Memo;
};

export default function Memo({ memo: { content, createdAt, id, character, modified, specialties } }: Props) {
    const queryClient = useQueryClient();

    const { mutate: deleteMemos } = useMutation({
        mutationFn: () =>
            deleteMemo({
                accessToken: `${getCookie('accessToken')}`,
                memoId: id,
            }),
        onMutate: () => {
            queryClient.invalidateQueries({ queryKey: ['allMemos'] });
        },
    });

    return (
        <div className="flex h-auto w-full flex-col  gap-[12px] rounded-[16px] bg-white px-[24px] pb-[24px] pt-[10px]">
            <div className=" flex items-center justify-between ">
                <CharacterLabel character={character} />
                <div>
                    <ActionButton onClick={deleteMemos} />
                </div>
            </div>
            <div className="text-regular16 leading-[24divx] text-[#4B4F58]">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            {specialties.length > 0 && (
                <ul className="mt-[12px] flex gap-[8px]">
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
