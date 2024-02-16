import NoteEditIcon from '@/assets/icons/note-edit_24x24.svg';
import FixedBottomArea from '@/components/fixed-bottom-area';
import { PageContainer } from '@/components/ui';
import CTAButton from '@/components/ui/cta-button';
import getMember, { checkIsLoggedIn } from '@/services/auth/getMember';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CharacterDetailContainer from './_components/character-detail-container';
import CharacterMemos from './_components/character-memos';
import Header from './_components/header';
import Specialties from './_components/specialties';

export default async function CharacterDetailPage({ params: { id } }: { params: { id: number } }) {
    const { isLoggedIn } = await checkIsLoggedIn({ accessToken: `${cookies().get('accessToken')?.value}` });
    if (!isLoggedIn) redirect('/');

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
                    <Link href={`?write=${characterId}`} scroll={false}>
                        <CTAButton>
                            <div className=" flex w-full items-center justify-center gap-[8px]">
                                <NoteEditIcon /> <span>먹이주기</span>
                            </div>
                        </CTAButton>
                    </Link>
                </FixedBottomArea>
            </div>
        </PageContainer>
    );
}
