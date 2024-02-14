import { PageContainer } from '@/components/ui';
import getCharacters from '@/services/character/getCharacters';
import { cookies } from 'next/headers';
import CharacterCard from './character-card';
import CharacterCreateButton from './character-create-button';
import CharacterCreateLink from './character-create-link';
import { LikeButton, LikeButtonWithTooltip } from './like-button';

const MAXIMUM_CHARACTER = 6;

export default async function Home({ params: { memberId } }: { params: { memberId: string } }) {
    const accessToken = cookies().get('accessToken')?.value;

    const characters = await getCharacters({
        memberId: Number(memberId),
        accessToken,
    });

    const isMyPage = characters?.isMe;
    const headerText = `${characters?.memberNickname}의 도감`;
    const showCharacterCreateButton = isMyPage && characters.characters.length < MAXIMUM_CHARACTER;

    return (
        <PageContainer hasNavigator={characters?.isMe}>
            <div className="flex-1 bg-[#F6F8FC]">
                <header className="flex items-center justify-between py-5 pl-6 pr-7">
                    <h1 className="text-bold24">{headerText}</h1>
                    {isMyPage ? (
                        <LikeButton component="div" cheerCount={characters.cheerCount} />
                    ) : (
                        <LikeButtonWithTooltip component="button" cheerCount={characters?.cheerCount ?? 0} />
                    )}
                </header>
                <section className="grid grid-cols-2 gap-3 px-6 pb-[90px] pt-4">
                    {characters?.characters?.map((character) => {
                        if (isMyPage)
                            return (
                                <CharacterCard
                                    key={character.id}
                                    component="link"
                                    href={`/character/${character.id}`}
                                    character={character}
                                />
                            );
                        return <CharacterCard key={character.id} component="div" character={character} />;
                    })}
                    {showCharacterCreateButton && <CharacterCreateButton />}
                </section>
            </div>

            {!isMyPage && (
                <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center  py-4">
                    <CharacterCreateLink />
                </div>
            )}
        </PageContainer>
    );
}