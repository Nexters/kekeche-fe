import { PageContainer } from '@/components/ui';
import { Header } from './_components/Header';
import MemosContainer from './_components/memos-container';
import SearchBox from './_components/search-box';

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
