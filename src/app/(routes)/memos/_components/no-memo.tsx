'use client';

import AlertCircle from '@/assets/icons/alert-circle.svg';
import { useRouter } from 'next/navigation';

export default function NoMemo() {
    const router = useRouter();
    return (
        <div className=" mt-[155px] flex w-full flex-col items-center">
            <AlertCircle />
            <span className="mt-[10px] text-bold18 text-gray-300">아직 작성한 기록이 없어요</span>
            <button
                onClick={() => {
                    router.push('/memos/create');
                }}
                className="bg-purple-200 mt-[25px] h-[48px] w-[118px] rounded-[12px] text-semibold16 text-[#ffffff]"
            >
                기록하러 가기
            </button>
        </div>
    );
}
