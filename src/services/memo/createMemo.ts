export type CreateMemoRequest = {
    accessToken: string;
    content: string;
    characterId: number;
    specialtyIds: number[];
};

export type CreateMemoResponse = {
    id: number;
    name: string;
    level: number;
    isLevelUp: boolean;
    characterImage: string;
    itemImage: string;
    keywords: number[];
};

export default async function createMemo(request: CreateMemoRequest): Promise<CreateMemoResponse | undefined> {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${request.accessToken}`,
        },
        body: JSON.stringify({
            content: request.content,
            characterId: request.characterId,
            specialtyIds: request.specialtyIds,
        }),
    };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/memo`, option);
        if (res.ok) {
            const json = await res.json();
            return json.data;
        }
    } catch {
        return undefined;
    }
}
