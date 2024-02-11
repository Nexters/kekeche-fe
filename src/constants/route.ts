const ROUTES = {
    memoCreate: 'memos/create',
    memos: 'memos',
    my: 'my',
    characters: (memberId: number) => `/member/${memberId}`,
} as const;

export default ROUTES;
