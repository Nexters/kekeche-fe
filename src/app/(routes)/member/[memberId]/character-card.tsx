import BeanIcon from '@/assets/icons/bean_16x16.svg';
import { Character } from '@/types/character';
import Image from 'next/image';

interface Props {
    character: Character;
}

export default function CharacterCard({ character }: Props) {
    const content = (
        <>
            <div className="mx-auto mb-2 flex w-fit items-center gap-[2px] rounded-full bg-[#2777ea] px-2 py-1">
                <span className="h-4 w-4">
                    <BeanIcon fill="#606FD8" />
                </span>
                <span className="text-[12px] font-semibold leading-[11px] text-white">{`Lv.${character.level}`}</span>
            </div>
            <div className="mb-1 h-[120px] w-[120px] rounded-lg bg-white">
                <div className="relative mx-auto h-[100px] w-[100px]">
                    <Image
                        width={100}
                        height={100}
                        alt={character.name}
                        src={character.characterImage}
                        className="absolute left-0 right-0"
                    />
                    {character.itemImage && (
                        <Image
                            src={character.itemImage}
                            alt={character.name}
                            className="absolute left-0 top-0"
                            width={100}
                            height={100}
                        />
                    )}
                </div>
            </div>
            <p className="text-bold14 text-contentPrimaryLight">{character.name}</p>
        </>
    );

    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#f3f4f6] bg-[#ffffff]  py-[18px]">
            {content}
        </div>
    );
}
