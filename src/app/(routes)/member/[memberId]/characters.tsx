import { GetCharactersResponse } from '@/services/character/getCharacters';
import CharacterCard from './character-card';
import CharacterCreateButton from './character-create-button';

type Props = {
    isMyPage: boolean;
    characters: GetCharactersResponse['characters'];
};

const MAXIMUM_CHARACTER = 6;

export function Characters({ characters, isMyPage }: Props) {
    const showCharacterCreateButton = isMyPage && characters.length < MAXIMUM_CHARACTER;

    return (
        <section className="flex-1 bg-[#F6F8FC] px-6 pb-[90px]">
            <h2 className="mb-[10px] pt-5 text-[20px] font-bold leading-[32px] text-[#494E59]">성장 기록지</h2>
            <div className="grid grid-cols-2 gap-3">
                {characters?.map((character, i) => {
                    if (isMyPage)
                        return (
                            <CharacterCard
                                key={character.id}
                                component="link"
                                href={`/character/${character.id}`}
                                character={character}
                                order={i}
                            />
                        );
                    return <CharacterCard order={i} key={character.id} component="div" character={character} />;
                })}
                {showCharacterCreateButton && <CharacterCreateButton />}
            </div>
        </section>
    );
}
