import { PageContainer } from '@/components/ui';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { Header } from './_components/Header';
import MemosContainer from './_components/memos-container';
import SearchBox from './_components/search-box';
import { getAllMemos } from '@/services/getAllMemos';

export default async function MemosPage() {
    // const queryClient = new QueryClient();
    // const accessToken = cookies().get('accessToken');
    // await queryClient.prefetchQuery({
    //     queryKey: ['allMemos', 'DESC', 'createdAt'],
    //     queryFn: () => getAllMemos(`${accessToken}`, 0, 'DESC', 'createdAt'),
    // });

    return (
        <PageContainer hasNavigator>
            <Header text="기록" />
            <SearchBox />
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
            <MemosContainer />
            {/* </HydrationBoundary> */}
        </PageContainer>
    );
}
