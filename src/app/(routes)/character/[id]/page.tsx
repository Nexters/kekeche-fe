import NoteEditIcon from '@/assets/icons/note-edit_24x24.svg';
import FixedBottomArea from '@/components/fixed-bottom-area';
import CTAButton from '@/components/ui/cta-button';
import { checkIsLoggedIn } from '@/services/auth/getMember';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CharacterDetailContainer from './_components/character-detail-container';
import CharacterMemos from './_components/character-memos';
import Header from './_components/header';
import Specialties from './_components/specialties';
import { PrefetchBoundary } from '../../../../context/prefetch-boundary';
import { characterDetailQueryOptions, memberQueryOptions } from '@/store/query/useCharacterDetailQueries';
import { characterSpecialtyOptions } from '@/store/query/useCharacterSpecialtyQuery';
import { characterMemosOptions } from '@/store/query/useCharacterMemosQuery';
import { PrefetchOptions } from '@/types/query';
import PageContainerV2 from '@/components/page-container-v2/page-container-v2';

export default async function CharacterDetailPage({ params: { id } }: { params: { id: number } }) {
    const accessToken = `${cookies().get('accessToken')?.value}`;

    const { isLoggedIn } = await checkIsLoggedIn({ accessToken });
    if (!isLoggedIn) redirect('/');

    const characterId = Number(id);

    const options: PrefetchOptions[] = [
        memberQueryOptions(accessToken),
        characterDetailQueryOptions(accessToken, characterId),
        characterSpecialtyOptions(accessToken, characterId),
        characterMemosOptions(accessToken, characterId),
    ];

    return (
        <PageContainerV2>
            <div className={`relative min-h-screen p-0 text-[18px]  font-[600] gradation-bg`}>
                <Suspense>
                    <PrefetchBoundary prefetchOptions={options}>
                        <Header />
                        <CharacterDetailContainer hasBubble={true} />
                        <Specialties />
                        <CharacterMemos />
                    </PrefetchBoundary>
                </Suspense>
                <FixedBottomArea
                    contents={
                        <Link href={`?write=${characterId}`}>
                            <CTAButton>
                                <div className=" flex w-full items-center justify-center gap-[8px]">
                                    <NoteEditIcon /> <span>{'먹이주기'}</span>
                                </div>
                            </CTAButton>
                        </Link>
                    }
                />
            </div>
        </PageContainerV2>
    );
}
