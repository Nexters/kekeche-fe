export type Character = {
    id: number;
    name: string;
    level: number;
    totalExp: number;
    currentExp: number;
    nextExp: number;
    characterImage: string;
    itemImage: string;
    keywords: number[];
};

export type GetCharactersResponse = {
    characters: Character[];
    isMe: boolean;
    memberNickname: string;
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

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/member/${request.memberId}`,
        request.accessToken ? authOption : undefined,
    );
    if (res.ok) {
        const json = await res.json();
        return json.data;
    } else {
        throw new Error('존재하지 않는 유저 페이지에요!');
    }
}
