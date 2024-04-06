import { PageContainer } from '@/components/ui';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Header from './_components/header';
import MemosContainer from './_components/memos-container';
import SearchBox from './_components/search-box';
import { allMemosQueryOptions } from '@/store/query/useAllMemosQuery';
import { PrefetchBoundary } from '@/context/prefetch-boundary';

export default async function MemosPage() {
    const accessToken = `${cookies().get('accessToken')?.value}`;

    const prefetchOptions = allMemosQueryOptions(accessToken);

    return (
        <PageContainer bgColor="bg-[#F8F8FB]" hasNavigator>
            <Header text="기록" />
            <SearchBox />
            <Suspense>
                <PrefetchBoundary prefetchOptions={prefetchOptions}>
                    <MemosContainer />
                </PrefetchBoundary>
            </Suspense>
        </PageContainer>
    );
}
