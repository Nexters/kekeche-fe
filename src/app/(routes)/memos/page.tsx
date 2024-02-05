import { PageContainer } from '@/components/ui';
import { getAllMemos } from '@/services/memo/getAllMemos';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Header from './_components/Header';
import MemosContainer from './_components/memos-container';
import SearchBox from './_components/search-box';

export default async function MemosPage() {
    const queryClient = new QueryClient();
    const accessToken = cookies().get('accessToken')?.value;

    await queryClient.prefetchQuery({
        queryKey: ['allMemos'],
        queryFn: () => getAllMemos(`${accessToken}`, 0, 'DESC', 'createdAt'),
    });

    return (
        <PageContainer hasNavigator>
            <Header text="기록" />
            <SearchBox />
            <Suspense>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <MemosContainer />
                </HydrationBoundary>
            </Suspense>
        </PageContainer>
    );
}
