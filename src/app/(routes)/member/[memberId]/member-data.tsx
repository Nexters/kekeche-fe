import EggImage from '@/assets/images/egg.png';
import PencilImage from '@/assets/images/pencil.png';
import { GetCharactersResponse } from '@/services/character/getCharacters';
import Image from 'next/image';

type Props = Pick<GetCharactersResponse, 'joinDays' | 'memoCount'>;
export function MemberData({ joinDays, memoCount }: Props) {
    return (
        <section className="mb-5 px-6">
            <h2 className="mb-[10px] pt-5 text-[20px] font-bold leading-[32px] text-[#494E59]">성장과정</h2>
            <div className="flex justify-between gap-[10px] pb-[6px]">
                <div className="flex flex-1 items-center justify-between rounded-xl bg-[#F6F8FC] px-5 py-[18px]">
                    <div>
                        <div className="text-[12px] font-medium leading-[18px] text-[#8B92A0]">성장한지</div>
                        <div className="text-[20px] font-bold leading-[30px] text-[#2777EA]">{joinDays}일</div>
                    </div>
                    <div className="flex h-[50px] w-[50px] rounded-lg bg-white">
                        <Image
                            alt=""
                            objectFit="cover"
                            priority
                            width={50}
                            height={50}
                            src={EggImage}
                            className="rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-between rounded-xl  bg-[#F6F8FC] px-5 py-[18px]">
                    <div>
                        <div className="text-[12px] font-medium leading-[18px] text-[#8B92A0]">총 메모</div>
                        <div className="text-[20px] font-bold leading-[30px] text-[#2777EA]">{memoCount}개</div>
                    </div>
                    <div className="flex h-[50px] w-[50px] rounded-lg bg-white">
                        <Image
                            alt=""
                            objectFit="cover"
                            priority
                            width={50}
                            height={50}
                            src={PencilImage}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
