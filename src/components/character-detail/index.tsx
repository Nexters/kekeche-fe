import { Keywords } from '@/constants/character-info';
import { Character } from '@/types/character';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type Props = {
    className?: string;
    character: Character;
};

export default function CharacterDetail({ className, character }: Props) {
    const { name, keywords, characterImage, currentExp, nextExp, level, itemImage } = character;

    return (
        <div className={twMerge('flex h-auto w-full flex-col items-center', className)}>
            <h3 className="text-H1 text-black">{name}</h3>
            <ul className="mt-[6px] flex gap-[4px]">
                {keywords.map((keywordIdx) => (
                    <li
                        className="text-primary-500 rounded-[8px] bg-[#E0ECFF] px-[12px] py-[4px] text-[12px] font-[500]"
                        key={keywordIdx}
                    >
                        {Keywords[keywordIdx].name}
                    </li>
                ))}
            </ul>
            <div className="relative h-[299px] w-[328px]">
                <Image
                    priority
                    alt="캐릭터 이미지"
                    src={characterImage}
                    width={328}
                    height={299}
                    className="absolute left-0 top-0"
                />
                {itemImage && (
                    <Image
                        priority
                        alt="아이템 이미지"
                        src={itemImage}
                        width={328}
                        height={299}
                        className="absolute left-0 top-0"
                    />
                )}
            </div>
            <div className="mt-[20px] flex h-[56px] w-[327px] items-center justify-center gap-[20px] rounded-[16px] bg-white">
                <span className="text-primary-500 text-[16px] font-bold">{`LV.${level}`}</span>
                <div className="bg-newGray-400 relative h-[24px] w-[233px] rounded-full">
                    <div
                        style={{ width: `${(currentExp / nextExp) * 100}%` }}
                        className={`bg-primary-500 absolute left-0 top-0 h-full rounded-full `}
                    />
                    <div className="absolute right-[14.4px] my-auto flex h-full items-center">
                        <span className="text-[12px] font-semibold text-white">{`${currentExp}/${nextExp}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
