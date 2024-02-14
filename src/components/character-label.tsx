import { Character, CharacterWithThumbnail } from '@/types/character';
import { Memo } from '@/types/memo';
import Image from 'next/image';

export default function CharacterLabel({ character: { name, characterImage } }: { character: Memo['character'] }) {
    return (
        <div className="flex flex h-full w-auto items-center gap-[8px]">
            <Image alt="캐릭터 배지" src={characterImage} width={24} height={24} className="rounded-full" />
            <span className="w-auto text-[14px] font-[600] text-newGray-900">{name}</span>
        </div>
    );
}
