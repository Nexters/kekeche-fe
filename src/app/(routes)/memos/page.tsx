import { PageContainer } from '@/components/ui';
import SearchBox from './_components/search-box';
import Memo from './_components/memo';
import { Header } from './_components/Header';
import MemosContainer from './_components/memos-container';

export default function MemosPage() {
    return (
        <PageContainer hasNavigator>
            <Header text="기록" />
            <SearchBox />
            <MemosContainer />
        </PageContainer>
    );
}
