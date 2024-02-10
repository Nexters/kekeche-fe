const ROUTES = {
    memoCreate: 'memos/create',
    memos: 'memos',
    my: 'my',
    characters: (memberId: number) => memberId,
} as const;

export default ROUTES;
