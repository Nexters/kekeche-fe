export type EditCharacterNameRequest = {
    accessToken: string;
    characterName: string;
    characterId: number;
};

export default async function editCharacterName(request: EditCharacterNameRequest) {
    const option = {
        method: 'PUT',
        headers: {
            Authorization: `${request.accessToken}`,
        },
        body: JSON.stringify({ name: request.characterName }),
    };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/${request.characterId}`,
            option,
        );
        if (res.ok) {
            const json = await res.json();
            return json.data;
        }
    } catch {
        return undefined;
    }
}
