'use client';

import CharacterDetail from '@/components/character-detail';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function CharacterDetailContainer() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const ref = useRef<HTMLDivElement>(null);

    const { data: character } = useSuspenseQuery({
        queryKey: ['character', 'detail', characterId],
        queryFn: () => getCharacterDetail({ accessToken: `${getCookie('accessToken')}`, characterId }),
        staleTime: 1000 * 60 * 5,
    });

    return <CharacterDetail ref={ref} character={character} className="mt-[24px]" />;
}
