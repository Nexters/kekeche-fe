import { PageContainer } from '@/components/ui';
import getCharacters from '@/services/character/getCharacters';
import { cookies } from 'next/headers';
import Link from 'next/link';
import CharacterCard from './character-card';
import CharacterCreateButton from './character-create-button';
import CharacterCreateLink from './character-create-link';

const MAXIMUM_CHARACTER = 6;

export default async function Home({ params: { memberId } }: { params: { memberId: string } }) {
    const accessToken = cookies().get('accessToken')?.value;
    const characters = await getCharacters({
        memberId: Number(memberId),
        accessToken,
    });

    const isMyPage = characters?.isMe;
    const headerText = !characters ? '' : `${characters?.memberNickname}의 도감`;

    const showCharacterCreateButton = isMyPage && characters.characters.length < MAXIMUM_CHARACTER;

    return (
        <PageContainer hasNavigator={characters?.isMe}>
            <div className="mb-2  py-5 text-center text-[24px] font-bold leading-8">{headerText}</div>
            <div className="grid grid-cols-2 gap-3 px-6 pb-[90px] pt-4">
                {characters?.characters?.map((character) => {
                    if (isMyPage)
                        return (
                            <Link key={character.id} href={`/character/${character.id}`}>
                                <CharacterCard character={character} />
                            </Link>
                        );
                    return (
                        <div key={character.id}>
                            <CharacterCard character={character} />
                        </div>
                    );
                })}
                {showCharacterCreateButton && <CharacterCreateButton />}
                {!isMyPage && (
                    <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center py-4">
                        <CharacterCreateLink />
                    </div>
                )}
            </div>
        </PageContainer>
    );
}
