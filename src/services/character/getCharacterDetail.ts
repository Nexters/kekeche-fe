import { Character } from '@/types/character';

export type GetCharacterDetailResponse = Character;
export type GetCharacterDetailRequest = {
    accessToken?: string;
    characterId: number;
};

export default async function getCharacterDetail(
    request: GetCharacterDetailRequest,
): Promise<GetCharacterDetailResponse | undefined> {
    const authOption = {
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/${request.characterId}`,
            request.accessToken ? authOption : undefined,
        );
        if (res.ok) {
            const json = await res.json();
            return json.data;
        }
    } catch {
        return undefined;
    }
}
