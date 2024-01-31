export interface IAllMemos {
    memos: IMemo[];
    total_pages: number;
    total_count: number;
    page: number;
    size: number;
    has_next: boolean;
    has_previous: boolean;
    is_first_page: boolean;
    is_last_page: boolean;
}

export interface IMemo {
    memoId: number;
    characterId: number;
    content: string;
    createdAt: string;
}
