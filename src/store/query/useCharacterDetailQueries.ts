import getMember, { Member } from '@/services/auth/getMember';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { BasicSuspenseQueryOptions } from '@/types/query';
import { useSuspenseQueries } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const MEMBER_STALE_TIME = 1000 * 60 * 1;
const CHARACTER_DETAIL_STALE_TIME = 1000 * 60 * 5;

export const memberQueryOptions = (accessToken: string): BasicSuspenseQueryOptions<Member> => ({
    queryKey: ['auth'],
    queryFn: () => getMember({ accessToken }),
});

export const characterDetailQueryOptions = (accessToken: string, characterId: number) => ({
    queryKey: ['character', 'detail', characterId],
    queryFn: () => getCharacterDetail({ accessToken, characterId }),
});

export function useCharacterDetailQueries(characterId: number) {
    return useSuspenseQueries({
        queries: [
            { ...memberQueryOptions(`${getCookie('accessToken')}`), staleTime: MEMBER_STALE_TIME },

            {
                ...characterDetailQueryOptions(`${getCookie('accessToken')}`, characterId),
                staleTime: CHARACTER_DETAIL_STALE_TIME,
            },
        ],
    });
}
