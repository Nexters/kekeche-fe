export type IncreaseCheerCountRequest = {
    accessToken: string;
    memberId: number;
};

export default async function IncreaseCheerCount(request: IncreaseCheerCountRequest) {
    const option = {
        method: 'POST',
    };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/member/cheer/${request.memberId}`,
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
