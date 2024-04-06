'use client';

import CharacterDetail from '@/components/character-detail';
import { useCharacterDetailQueries } from '@/store/query/useCharacterDetailQueries';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

type Props = {
    hasBubble?: boolean;
};

export default function CharacterDetailContainer({ hasBubble = false }: Props) {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const ref = useRef<HTMLDivElement>(null);

    const [_, { data: character }] = useCharacterDetailQueries(characterId);

    return <CharacterDetail ref={ref} character={character} className="mt-[24px]" hasBubble={hasBubble} />;
}
