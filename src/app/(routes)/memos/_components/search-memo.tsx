import { searchMemos } from '@/services/memo/searchMemos';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Memo from './memo';

type Props = {
    value: string;
};

export default function SearchMemo({ value }: Props) {
    const { data } = useQuery({
        queryKey: ['allMemos', 'DESC', 'createdAt'],
        queryFn: () => searchMemos(`${getCookie('accessToken')}`, value, 0, 'DESC', 'createdAt'),
    });
    return <>{data?.memos.map((memo) => <Memo key={memo.id} memo={memo} />)}</>;
}
