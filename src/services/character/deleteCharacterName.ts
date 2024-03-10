export type RemoveCharacterNameRequest = {
    accessToken: string;
    characterId: number;
};

export async function removeCharacterName(request: RemoveCharacterNameRequest) {
    const option = {
        method: 'DELETE',
        headers: {
            Authorization: `${request.accessToken}`,
        },
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
