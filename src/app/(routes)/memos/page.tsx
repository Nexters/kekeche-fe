import { PageContainer } from '@/components/ui';
import { Header } from './_components/Header';
import SearchBox from './_components/SearchBox';

export default function MemosPage() {
    return (
        <PageContainer hasNavigator>
            <Header text="기록" />
            <SearchBox />
        </PageContainer>
    );
}
