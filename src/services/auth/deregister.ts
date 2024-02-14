export type DeregisterRequest = {
    accessToken: string;
};

export default async function deregister(request: DeregisterRequest) {
    const authOption = {
        method: 'DELETE',
        headers: {
            Authorization: `${request.accessToken}`,
        },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/member`, authOption);
    if (res.ok) {
        const json = await res.json();
        return json.data;
    } else {
        throw new Error('네트워크에 문제가 발생했어요!');
    }
}
