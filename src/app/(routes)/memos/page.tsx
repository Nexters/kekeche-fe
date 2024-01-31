import { PageContainer } from '@/components/ui';
import SearchBox from './_components/search-box';
import MemosContainer, { getAllMemos } from './_components/memos-container';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Header } from './_components/header';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function MemosPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['allMemos', 'DESC', 'createdAt'],
        queryFn: () => getAllMemos(`${cookies().get('accessToken')}`),
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
