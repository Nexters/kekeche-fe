import { Character } from '@/types/character';

export type GetCharacterDetailResponse = Character;
export type GetCharacterDetailRequest = {
    accessToken?: string;
    characterId: number;
};

export default async function getCharacterDetail(
    request: GetCharacterDetailRequest,
): Promise<GetCharacterDetailResponse> {
    const authOption = {
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/${request.characterId}`,
        request.accessToken ? authOption : undefined,
    );
    if (res.ok) {
        const json = await res.json();
        return json.data;
    } else {
        throw new Error('존재하지 않는 캐릭터에요.');
    }
}
