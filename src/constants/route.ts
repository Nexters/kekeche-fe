const ROUTES = {
    memoCreate: '?write=on',
    memos: '/memos',
    my: '/my',
    characters: (memberId: number) => `/member/${memberId}`,
} as const;

export default ROUTES;
