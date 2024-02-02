export type DeleteMemoRequest = {
    accessToken: string;
    memoId: number;
};

export default async function deleteMemo(request: DeleteMemoRequest) {
    const option = {
        method: 'Delete',
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/memo/${request.memoId}`, option);
        if (res.ok) {
            const json = await res.json();
            return json.data;
        }
    } catch {
        return undefined;
    }
}
