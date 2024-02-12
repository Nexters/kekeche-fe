import { Keywords } from '@/constants/character-info';
import { Character } from '@/types/character';
import { twMerge } from 'tailwind-merge';

type Props = {
    className?: string;
    character: Character;
};

export default function CharacterDetail({ className, character }: Props) {
    const { name, keywords } = character;

    return (
        <div className={twMerge('flex h-auto w-full flex-col items-center', className)}>
            <h3 className="text-H1 text-black">{name}</h3>
            <div className="mt-[6px] flex gap-[4px]">
                {keywords.map((keywordIdx) => (
                    <div
                        className="rounded-[8px] bg-[#E0ECFF] px-[12px] py-[4px] text-[12px] font-[500] text-primary-500"
                        key={keywordIdx}
                    >
                        {Keywords[keywordIdx].name}
                    </div>
                ))}
            </div>
        </div>
    );
}
