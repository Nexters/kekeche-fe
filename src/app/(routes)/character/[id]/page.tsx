import { PageContainer } from '@/components/ui';
import CharacterDetailContainer from './_components/character-detail-container';
import Header from './_components/header';
import { Suspense } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import getMember from '@/services/auth/getMember';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { cookies } from 'next/headers';
import Specialties from './_components/specialties';
import CharacterMemos from './_components/character-memos';

export default async function CharacterDetailPage({ params: { id } }: { params: { id: number } }) {
    const queryClient = new QueryClient();

    const characterId = Number(id);

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['auth'],
            queryFn: () => getMember({ accessToken: `${cookies().get('accessToken')?.value}` }),
        }),
        queryClient.prefetchQuery({
            queryKey: ['character', characterId],
            queryFn: () => getCharacterDetail({ accessToken: `${cookies().get('accessToken')?.value}`, characterId }),
        }),
    ]);

    return (
        <PageContainer>
            <div className={`gradation-bg relative min-h-screen pb-24`}>
                <section>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <Suspense>
                            <Header />
                        </Suspense>
                        <Suspense>
                            <CharacterDetailContainer />
                        </Suspense>
                        <Suspense>
                            <Specialties />
                        </Suspense>
                        <Suspense>
                            <CharacterMemos />
                        </Suspense>
                    </HydrationBoundary>
                </section>
            </div>
        </PageContainer>
    );
}
