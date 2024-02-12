'use client';

import getCharacterDetail from '@/services/character/getCharacterDetail';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function CharacterDetail() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const {
        data: { name },
    } = useSuspenseQuery({
        queryKey: ['character', characterId],
        queryFn: () => getCharacterDetail({ accessToken: `${getCookie('accessToken')}`, characterId }),
        staleTime: 1000 * 60 * 5,
    });

    return <>{name}</>;
}
