import { Character } from './character';

export type SortOrders = 'DESC' | 'ASC';
export type SortTypes = 'createdAt' | 'modifiedAt';

export interface AllMemos {
    memos: Memo[];
    total_pages: number;
    total_count: number;
    page: number;
    size: number;
    has_next: boolean;
    has_previous: boolean;
    is_first_page: boolean;
    is_last_page: boolean;
}

export interface Memo {
    id: number;
    character: Pick<Character, 'id' | 'name'>;
    content: string;
    htmlContent: string;
    createdAt: string;
    hastags: string[];
    modified: boolean;
}
