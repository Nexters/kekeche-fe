import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const STALE_TIME = 1000 * 60 * 5;

export const characterSpecialtyOptions = (accessToken: string, characterId: number) => ({
    queryKey: ['character', 'specialties', characterId],
    queryFn: () => getCharacterSpecialty({ accessToken, characterId }),
});

export function useCharacterSpecialtyQuery(characterId: number) {
    return useSuspenseQuery({
        ...characterSpecialtyOptions(`${getCookie('accessToken')}`, characterId),
        staleTime: STALE_TIME,
    });
}
