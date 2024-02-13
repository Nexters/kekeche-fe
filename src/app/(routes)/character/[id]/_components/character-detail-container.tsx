'use client';

import getCharacterDetail from '@/services/character/getCharacterDetail';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';
import CharacterDetail from '@/components/character-detail/character-detail';

export default function CharacterDetailContainer() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const { data: character } = useSuspenseQuery({
        queryKey: ['character', characterId],
        queryFn: () => getCharacterDetail({ accessToken: `${getCookie('accessToken')}`, characterId }),
        staleTime: 1000 * 60 * 5,
    });

    return <CharacterDetail character={character} className="mt-[24px]" />;
}
