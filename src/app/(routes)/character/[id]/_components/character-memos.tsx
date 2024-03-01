'use client';

import Memo from '@/app/(routes)/memos/_components/memo';
import Memos from '@/components/memos';
import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import NoMemoFallback from '@/components/no-memo-fallback';

export default function CharacterMemos() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const {
        data: { memos, totalCount },
    } = useSuspenseQuery({
        queryKey: ['character', 'memos', characterId],
        queryFn: () =>
            getCharacterMemos({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
            }),
    });

    return (
        <div className=" mt-[16px] flex h-auto w-full flex-col items-center rounded-t-[24px] bg-newGray-100  pb-[160px] pt-[24px]">
            <h3 className="mb-[20px] w-full px-[24px] text-left text-Subtitle1 text-newGray-900">{`기록 ${totalCount > 0 ? totalCount : ''}`}</h3>
            {memos.length === 0 && <NoMemoFallback />}
            {memos.length > 0 && (
                <Memos>
                    {memos.map((memo) => (
                        <Memo key={memo.id} memo={memo} />
                    ))}
                </Memos>
            )}
        </div>
    );
}
