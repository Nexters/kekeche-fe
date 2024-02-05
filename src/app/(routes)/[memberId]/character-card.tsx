import BeanIcon from '@/assets/icons/bean_pink.svg';
import { Character } from '@/types/character';
import Image from 'next/image';

//TODO: svg 다시 받기

interface Props {
    character: Character;
}

export default function CharacterCard({ character }: Props) {
    const content = (
        <>
            <div className="mx-auto mb-2 flex w-fit items-center rounded-full bg-[#C4CAF7] px-2 py-[6px]">
                <span className="h-4 w-4">
                    <BeanIcon fill="#606FD8" />
                </span>
                <span className="text-[12px] font-semibold leading-3 text-[#606FD8]">{`Lv.${character.level}`}</span>
            </div>
            <div className="relative mb-1 h-[120px] w-[120px] rounded-lg bg-white">
                <Image
                    width={120}
                    height={120}
                    priority
                    alt={character.name}
                    src={character.characterImage}
                    className="absolute left-0 top-0"
                />
                <Image
                    priority
                    src={character.itemImage}
                    alt={character.name}
                    className="absolute left-0 top-0"
                    width={120}
                    height={120}
                />
            </div>
            <p className="mb-1 text-semibold14 text-contentPrimaryLight">{character.name}</p>
            <div className="h-[15px] w-full">
                <div className="flex items-center gap-1">
                    <span className="relative h-2 flex-1 rounded-full bg-gray-200">
                        <span
                            className="inest-0 absolute h-full  rounded-full bg-[#606FD8]"
                            style={{
                                width: `${(character.currentExp / character.nextExp) * 100}%`,
                            }}
                        />
                    </span>
                    <span className="text-[10px] font-semibold leading-[15px] text-[#565E71]">
                        {character.currentExp}/{character.nextExp}
                    </span>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F2F3FB] px-4 py-[18px]">
            {content}
        </div>
    );
}
