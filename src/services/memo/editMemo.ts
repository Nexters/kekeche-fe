export type EditMemoRequest = {
    accessToken: string;
    content: string;
    specialtyIds: number[];
};

export default async function editMemo(request: EditMemoRequest) {
    const option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${request.accessToken}`,
        },
        body: JSON.stringify({
            content: request.content,
            specialtyIds: [],
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
