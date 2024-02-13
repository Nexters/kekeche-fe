import { Character, CharacterWithThumbnail } from '@/types/character';
import Image from 'next/image';

export default function CharacterLabel({ character: { name } }: { character: Pick<Character, 'id' | 'name'> }) {
    return (
        <div className="flex w-auto gap-[8px]">
            {/**
             * TODO: 캐릭터 이미지 넣기
             */}
            <Image alt="캐릭터 배지" src={''} width={24} height={24} className="rounded-full" />
            <span className="font-600 w-auto text-[14px] text-newGray-900">{name}</span>
        </div>
    );
}
