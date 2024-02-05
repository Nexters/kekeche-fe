export type CreateMemoRequest = {
    accessToken: string;
    content: string;
    characterId: number;
    hashtags: string[];
    htmlContent: string;
};

export default async function createMemo(request: CreateMemoRequest) {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${request.accessToken}`,
        },
        body: JSON.stringify({
            content: request.content,
            characterId: request.characterId,
            hashtags: request.hashtags,
            htmlContent: request.htmlContent,
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
