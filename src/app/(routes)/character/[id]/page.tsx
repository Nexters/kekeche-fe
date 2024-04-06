import NoteEditIcon from '@/assets/icons/note-edit_24x24.svg';
import FixedBottomArea from '@/components/fixed-bottom-area';
import { PageContainer } from '@/components/ui';
import CTAButton from '@/components/ui/cta-button';
import getMember, { checkIsLoggedIn } from '@/services/auth/getMember';
import getCharacterDetail from '@/services/character/getCharacterDetail';
import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CharacterDetailContainer from './_components/character-detail-container';
import CharacterMemos from './_components/character-memos';
import Header from './_components/header';
import Specialties from './_components/specialties';
import { PrefetchBoundary } from './_components/prefetch-boundary';

export default async function CharacterDetailPage({ params: { id } }: { params: { id: number } }) {
    const { isLoggedIn } = await checkIsLoggedIn({ accessToken: `${cookies().get('accessToken')?.value}` });
    if (!isLoggedIn) redirect('/');

    const characterId = Number(id);

    const options = [
        {
            queryKey: ['auth'],
            queryFn: () => getMember({ accessToken: `${cookies().get('accessToken')?.value}` }),
        },
        {
            queryKey: ['character', 'detail', characterId],
            queryFn: () => getCharacterDetail({ accessToken: `${cookies().get('accessToken')?.value}`, characterId }),
        },
        {
            queryKey: ['character', 'specialties', characterId],
            queryFn: () =>
                getCharacterSpecialty({ accessToken: `${cookies().get('accessToken')?.value}`, characterId }),
        },
        {
            queryKey: ['character', 'memos', characterId],
            queryFn: () =>
                getCharacterMemos({
                    accessToken: `${cookies().get('accessToken')?.value}`,
                    characterId,
                }),
        },
    ];

    return (
        <PageContainer>
            <div className={`relative min-h-screen p-0 text-[18px]  font-[600] gradation-bg`}>
                <Suspense fallback={<div>loading2</div>}>
                    <PrefetchBoundary prefetchOptions={[options[0], options[1]]}>
                        <Header />
                        <CharacterDetailContainer hasBubble={true} />
                    </PrefetchBoundary>
                </Suspense>
                <Suspense fallback={<div>loading1</div>}>
                    <PrefetchBoundary prefetchOptions={options}>
                        <Specialties />
                        <CharacterMemos />
                    </PrefetchBoundary>
                </Suspense>
                <FixedBottomArea>
                    <Link href={`?write=${1}`}>
                        <CTAButton>
                            <div className=" flex w-full items-center justify-center gap-[8px]">
                                <NoteEditIcon /> <span>{'먹이주기'}</span>
                            </div>
                        </CTAButton>
                    </Link>
                </FixedBottomArea>
            </div>
        </PageContainer>
    );
}
