'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import { useRouter } from 'next/navigation';

export default function NoCharacterHeader() {
    const router = useRouter();

    return (
        <header className="mb-[10px] flex justify-between gap-2">
            <button
                onClick={() => {
                    router.back();
                }}
                aria-label="뒤로 가기 버튼"
                className="p-3"
            >
                <BackArrowIcon stroke="#8E939E" />
            </button>
            <span className=" grid flex-1 place-items-center text-center text-[18px] font-semibold leading-7 text-gray-500">
                기록 작성
            </span>
            <div className="w-[42px]">{null}</div>
        </header>
    );
}
