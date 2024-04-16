import A2HS from '@/hooks/useA2HS';
import { cookies } from 'next/headers';
import PageContainerV2 from '@/components/page-container-v2/page-container-v2';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { charactersQueryOptions } from '@/store/query/useCharactersQuery';
import { CharactersContainer } from './characters-container';

export const runtime = 'edge';

export default async function Home({ params: { memberId } }: { params: { memberId: number } }) {
    const accessToken = `${cookies().get('accessToken')?.value}`;

    const queryClient = new QueryClient();
    const { isMe } = await queryClient.fetchQuery(charactersQueryOptions(accessToken, memberId));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PageContainerV2 hasNavigator={isMe}>
                <CharactersContainer memberId={memberId} />
                <A2HS />
            </PageContainerV2>
        </HydrationBoundary>
    );
}
