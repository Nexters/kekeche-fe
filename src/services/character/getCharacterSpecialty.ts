import { CharacterSpecialty } from '@/types/character';

export type GetCharacterSpecialtyResponse = {
    specialties: CharacterSpecialty[];
};

export type GetCharacterSpecialtyRequest = {
    accessToken?: string;
    characterId: number;
};

export default async function getCharacterSpecialty(
    request: GetCharacterSpecialtyRequest,
): Promise<GetCharacterSpecialtyResponse> {
    const authOption = {
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/${request.characterId}/specialty`,
        authOption,
    );
    if (res.ok) {
        const json = await res.json();
        return json.data;
    } else {
        throw new Error('네트워크에 문제가 생겼어요!');
    }
}
