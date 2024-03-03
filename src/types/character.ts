export interface Character {
    id: number;
    name: string;
    level: number;
    totalExp: number;
    currentExp: number;
    nextExp: number;
    characterImage: string;
    itemImage?: string; // NOTE: 아이템 선택 안한 경우, 해당 필드가 없을 수 있음.
    keywords: number[];
}

export interface CharacterWithThumbnail {
    id: number;
    name: string;
    characterImage: string;
    isMemoValid: boolean;
}

export interface CharacterSpecialty {
    id: number;
    content: string;
    memoCnt: number;
}

export type CharacterImageProps = {
    characterImage: string;
    itemImage: string;
    size: 'small' | 'large';
    className?: string;
};
