export type Character = {
    id: number;
    name: string;
    level: number;
    exp: number;
    nextLevel: number;
    characterImage: string;
    itemImage: string;
    keywords: number[];
};

export type GetCharactersResponse = {
    characters: Character[];
    isMe: boolean;
};

export type GetCharactersRequest = {
    memberId: number;
    accessToken?: string;
};

export default async function getCharacters(request: GetCharactersRequest): Promise<GetCharactersResponse | undefined> {
    const authOption = {
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/member/${request.memberId}`,
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
