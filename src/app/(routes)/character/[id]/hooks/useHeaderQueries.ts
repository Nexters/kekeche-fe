import getMember from '@/services/auth/getMember';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { useQueries } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

export default function useHeaderQueries(characterId: number) {
    const [{ data: member }, { data: character }] = useQueries({
        queries: [
            {
                queryKey: ['auth'],
                queryFn: () => getMember({ accessToken: `${getCookie('accessToken')}` }),
            },
            {
                queryKey: ['character', 'detail', characterId],
                queryFn: () => getCharacterDetail({ accessToken: `${getCookie('accessToken')}`, characterId }),
                staleTime: 1000 * 60 * 5,
            },
        ],
    });

    return { member, character };
}
