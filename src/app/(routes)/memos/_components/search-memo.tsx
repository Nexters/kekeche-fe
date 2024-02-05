import { searchMemos } from '@/services/memo/searchMemos';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Memo from './memo';
import { useSearchParams } from 'next/navigation';

export default function SearchMemo() {
    const searchParams = useSearchParams();
    const value = searchParams.get('search') ?? '';

    const { data } = useQuery({
        queryKey: ['memos', 'search', value],
        queryFn: () => searchMemos(`${getCookie('accessToken')}`, value, 0, 'DESC', 'createdAt'),
        staleTime: 1000 * 60,
        enabled: value.length > 0,
    });

    return <>{data?.memos.map((memo) => <Memo key={memo.id} memo={memo} />)}</>;
}
