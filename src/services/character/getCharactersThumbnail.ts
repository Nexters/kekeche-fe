import { CharacterWithThumbnail } from '@/types/character';

export type GetCharactersThumbnailResponse = CharacterWithThumbnail[];

export type GetCharactersThumbnailRequest = {
    accessToken?: string;
};

export default async function getCharactersThumbnail(
    request: GetCharactersThumbnailRequest,
): Promise<GetCharactersThumbnailResponse | undefined> {
    const authOption = {
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/thumbnail`, authOption);
    if (res.ok) {
        const json = await res.json();
        return json.data;
    } else {
        throw new Error('존재하지 않는 유저 페이지에요!');
    }
}
