'use client';

import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';

export default function CharacterMemos() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const { data } = useSuspenseQuery({
        queryKey: ['character', 'memos', characterId],
        queryFn: () =>
            getCharacterMemos({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
            }),
    });

    return (
        <div className="mt-[24px] flex h-[600px] w-full flex-col items-center rounded-t-[24px] bg-newGray-100 px-[23.5px] pb-[160px] pt-[24px]">
            <h3 className="mb-[20px] w-full text-left text-Subtitle1 text-newGray-900">{`메모 ${data.totalPages}`}</h3>
        </div>
    );
}
