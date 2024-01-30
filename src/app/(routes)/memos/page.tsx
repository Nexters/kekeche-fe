import { PageContainer } from '@/components/ui';
import SearchBox from './_components/search-box';
import { Header } from './_components/Header';
import MemosContainer, { getAllMemos } from './_components/memos-container';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function MemosPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: () => getAllMemos(),
    });

    return (
        <PageContainer hasNavigator>
            <Header text="기록" />
            <SearchBox />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MemosContainer />
            </HydrationBoundary>
        </PageContainer>
    );
}
