'use client';

import NoMemoBadgeImg from '@/assets/images/no-memo-character.png';
import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NoCharacter() {
    const router = useRouter();
    return (
        <div className=" mt-[155px] flex w-full flex-col items-center">
            <div className="mt-[12px] flex w-full flex-col items-center gap-[10px] py-[20px]">
                <Image alt="대체 이미지" src={NoMemoBadgeImg} width={80} height={80} />
                <p className="text-newGray-500 text-[18px] font-[500]">{'아직 캐릭터가 없어요'}</p>
            </div>

            <Link href={'/create'}>
                <button className="bg-primary-500 mt-[25px] h-[48px] w-fit rounded-[12px] px-6 text-semibold16 text-[#ffffff]">
                    캐릭터 만들러 가기
                </button>
            </Link>
        </div>
    );
}
