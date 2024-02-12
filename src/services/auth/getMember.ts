export type Member = {
    memberId: number;
    characterCount: number;
    memoCount: number;
};

export type GetMemberResponse = Member;

export type GetMemberRequest = {
    accessToken?: string;
};

export default async function getMember(request: GetMemberRequest): Promise<GetMemberResponse> {
    const authOption = {
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/member`,
        request.accessToken ? authOption : undefined,
    );
    if (res.ok) {
        const json = await res.json();
        return json.data;
    } else {
        console.log(res);
        throw new Error('접근할 수 없는 유저입니다.');
    }
}
