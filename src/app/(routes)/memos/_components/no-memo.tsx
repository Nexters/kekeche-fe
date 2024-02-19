'use client';

import NoMemoFallback from '@/components/no-memo-fallback';
import Link from 'next/link';

export default function NoMemo() {
    return (
        <div className=" mt-[155px] flex w-full flex-col items-center">
            <NoMemoFallback />
            <Link href={'?write=on'}>
                <button className="mt-[25px] h-[48px] w-[118px] rounded-[12px] bg-primary-500 text-semibold16 text-[#ffffff]">
                    기록하러 가기
                </button>
            </Link>
        </div>
    );
}
