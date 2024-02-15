'use client';

import Memo from '@/app/(routes)/memos/_components/memo';
import Memos from '@/components/memos';
import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NoMemoBadgeImg from '@/assets/images/no-memo-character.png';
import NoMemoFallback from '@/components/no-memo-fallback';

export default function CharacterMemos() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const {
        data: { memos, totalPages },
    } = useSuspenseQuery({
        queryKey: ['character', 'memos', characterId],
        queryFn: () =>
            getCharacterMemos({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
            }),
    });

    return (
        <div className=" flex h-auto w-full flex-col items-center rounded-t-[24px] bg-newGray-100 px-[23.5px] pb-[160px] pt-[24px]">
            <h3 className="mb-[20px] w-full text-left text-Subtitle1 text-newGray-900">{`메모 ${totalPages > 0 ? totalPages : ''}`}</h3>
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
