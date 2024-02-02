export type Member = {
    memberId: number;
    characterCount: number;
    memoCount: number;
};

export type GetMemberResponse = Member;

export type GetMemberRequest = {
    accessToken?: string;
};

export default async function getMember(request: GetMemberRequest): Promise<GetMemberResponse | undefined> {
    const authOption = {
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/member`,
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
