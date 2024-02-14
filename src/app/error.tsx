'use client';

import { PageContainer } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const router = useRouter();
    useEffect(() => {
        // 로그 남기기 용도
        console.error(error.message);
    }, [error]);

    return (
        <PageContainer>
            <div className=" flex h-screen  w-full translate-y-[300px] flex-col items-center">
                <div className=" text-H1 text-black">{'네트워크에 문제가 생겼어요!'}</div>
                <div className="flex-2 mt-[40px] flex gap-[10px]">
                    <button
                        className="bg-newGray-600 text-Subtitle1 h-[40px] w-[100px] rounded-[10px] text-white"
                        onClick={() => router.push('/')}
                    >
                        홈
                    </button>
                    <button
                        className="bg-primary-500 text-Subtitle1 h-[40px] w-[100px] rounded-[10px] text-white"
                        onClick={() => reset()}
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        </PageContainer>
    );
}
