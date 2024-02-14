export type DeleteCharacterSpecialtyRequest = {
    accessToken: string;
    characterId: number;
    specialtyId: number;
};

export default async function deleteCharacterSpecialty({
    characterId,
    accessToken,
    specialtyId,
}: DeleteCharacterSpecialtyRequest) {
    const option = {
        method: 'DELETE',
        headers: {
            Authorization: `${accessToken}`,
        },
    };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/${characterId}/specialty/${specialtyId}`,
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
