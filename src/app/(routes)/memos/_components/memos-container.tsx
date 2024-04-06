'use client';

import Memo from './memo';
import NoMemo from './no-memo';
import Memos from '@/components/memos';
import { useAllMemosQuery } from '@/store/query/useAllMemosQuery';
import { useSearchMemosQuery } from '@/store/query/useSearchMemosQuery';

export default function MemosContainer() {
    const { data: allMemos } = useAllMemosQuery();

    const { data: searchedMemos, searchValue } = useSearchMemosQuery();

    return (
        <Memos>
            {searchValue && searchedMemos ? (
                searchedMemos.memos.map((memo) => <Memo key={memo.id} memo={memo} />)
            ) : allMemos?.memos.length === 0 ? (
                <NoMemo />
            ) : (
                allMemos?.memos.map((memo) => <Memo key={memo.id} memo={memo} />)
            )}
        </Memos>
    );
}
