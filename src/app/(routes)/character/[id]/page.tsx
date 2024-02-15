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
import CTAButton from '@/components/ui/cta-button';
import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import FixedBottomArea from '@/components/fixed-bottom-area';
import Link from 'next/link';
import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';

export default async function CharacterDetailPage({ params: { id } }: { params: { id: number } }) {
    const queryClient = new QueryClient();

    const characterId = Number(id);

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['auth'],
            queryFn: () => getMember({ accessToken: `${cookies().get('accessToken')?.value}` }),
        }),
        queryClient.prefetchQuery({
            queryKey: ['character', 'detail', characterId],
            queryFn: () => getCharacterDetail({ accessToken: `${cookies().get('accessToken')?.value}`, characterId }),
        }),
        queryClient.prefetchQuery({
            queryKey: ['character', 'specialties', characterId],
            queryFn: () =>
                getCharacterSpecialty({ accessToken: `${cookies().get('accessToken')?.value}`, characterId }),
        }),
        queryClient.prefetchQuery({
            queryKey: ['character', 'memos', characterId],
            queryFn: () =>
                getCharacterMemos({
                    accessToken: `${cookies().get('accessToken')?.value}`,
                    characterId,
                }),
        }),
    ]);

    return (
        <PageContainer>
            <div className={`relative min-h-screen p-0 text-[18px]  font-[600] gradation-bg`}>
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
                <FixedBottomArea>
                    <Link href="/memos/create">
                        <CTAButton text="메모 작성" />
                    </Link>
                </FixedBottomArea>
            </div>
        </PageContainer>
    );
}
