'use client';

import NoMemoFallback from '@/components/no-memo-fallback';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NoMemo() {
    const router = useRouter();
    return (
        <div className=" mt-[155px] flex w-full flex-col items-center">
            <NoMemoFallback />
            <Link href={'/memos/create'}>
                <button className="mt-[25px] h-[48px] w-[118px] rounded-[12px] bg-purple-200 text-semibold16 text-[#ffffff]">
                    기록하러 가기
                </button>
            </Link>
        </div>
    );
}
