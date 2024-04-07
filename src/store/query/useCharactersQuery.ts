import { Member } from '@/services/auth/getMember';
import getCharacters, { GetCharactersResponse } from '@/services/character/getCharacters';
import { BasicSuspenseQueryOptions } from '@/types/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

export const charactersQueryOptions = (
    accessToken: string,
    memberId: Member['memberId'],
): BasicSuspenseQueryOptions<GetCharactersResponse> => ({
    queryKey: ['characters', memberId],
    queryFn: () => getCharacters({ memberId, accessToken }),
});

export function useCharactersQuery(memberId: Member['memberId']) {
    return useSuspenseQuery({
        ...charactersQueryOptions(`${getCookie('accessToken')}`, memberId),
    });
}
