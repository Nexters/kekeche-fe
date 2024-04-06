import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const STALE_TIME = 5 * 60 * 1000;

export const characterMemosOptions = (accessToken: string, characterId: number) => ({
    queryKey: ['character', 'memos', characterId],
    queryFn: () =>
        getCharacterMemos({
            accessToken,
            characterId,
        }),
});

export function useCharacterMemosQuery(characterId: number) {
    return useSuspenseQuery({
        ...characterMemosOptions(`${getCookie('accessToken')}`, characterId),
        staleTime: STALE_TIME,
    });
}
