import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import FlowerIcon from '@/assets/icons/flower_pink_20x20.svg';
import MeatballIcon from '@/assets/icons/meatball_20x20.svg';
import PencilIcon from '@/assets/icons/pencil_24x24.svg';
import TrashIcon from '@/assets/icons/trash_24x24.svg';
import MockImage from '@/assets/images/mock_character_120x120.png';
import { PageContainer } from '@/components/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-shadcn/popover';
import Image from 'next/image';
import Link from 'next/link';

export default function CharacterDetail() {
    return (
        <PageContainer>
            <div className="relative pb-24">
                <section>
                    <div className="mb-5 flex justify-between gap-2">
                        <button aria-label="뒤로 가기 버튼" className="p-3">
                            <BackArrowIcon />
                        </button>
                        <span className="grid flex-1 place-items-center text-center text-[18px] font-semibold leading-7 text-contentPrimaryLight">
                            캐릭터 상세
                        </span>
                        <Popover modal>
                            <PopoverTrigger className="p-3">
                                <MeatballIcon />
                            </PopoverTrigger>
                            <PopoverContent className="shadow-[0_4px_16px_0_rgba(0, 0, 0, 0.16)] mr-3 w-fit rounded-[8px] border-none p-3">
                                <ul>
                                    <li>
                                        <button className="flex items-center gap-1">
                                            <PencilIcon stroke="#4B4F58" />
                                            <span className="text-semibold16 text-gray-600">수정</span>
                                        </button>
                                    </li>
                                    <div className="mx-[-12px] my-1 h-[1px] bg-gray-200" />
                                    <li>
                                        <button className="flex items-center gap-1">
                                            <TrashIcon stroke="#F04141" />
                                            <span className="text-semibold16 text-[#F04141]">삭제</span>
                                        </button>
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="mb-5 flex w-[87px] items-center justify-center gap-1 rounded-full bg-[#FFC9D0] px-[14px] py-[6px]">
                            <FlowerIcon />
                            <span className="text-bold16 font-bold text-[#E57897]">Lv.5</span>
                        </div>
                        <div className="mb-5">
                            <Image priority width={164} height={164} src={MockImage} alt="몰랑이" />
                        </div>
                        <div className="mb-4 rounded-2xl bg-gray-100 p-5">
                            <div className="mb-[10px] flex items-center justify-center gap-2">
                                <p className="text-semibold24 text-gray-600">이름최대8자인데</p>
                                <button aria-label="이름 수정하기 버튼">
                                    <PencilIcon stroke="#A6AAB4" />
                                </button>
                            </div>
                            <div className="flex gap-[6px] text-semibold14 text-gray-300">
                                <span className="rounded-full bg-gray-200 px-3 py-1">열정적</span>
                                <span className="rounded-full bg-gray-200 px-3 py-1">성실한</span>
                                <span className="rounded-full bg-gray-200 px-3 py-1">미래지향적</span>
                            </div>
                        </div>
                        <div className="h-[24px]">
                            <div className="flex items-center gap-2">
                                <span className="relative h-[18px] w-[210px] flex-1 rounded-full bg-gray-200">
                                    <span className="inest-0 absolute h-full w-1/3 rounded-full bg-[#FF97A0]" />
                                </span>
                                <span className="text-bold16 text-[#8E939E]">00/10</span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="mt-10 h-[12px] w-full bg-[#F0F1F7]" />
                <section>
                    <div className="p-6 text-semibold18 text-contentPrimaryLight">메모 12</div>
                </section>
                <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center py-4">
                    <Link
                        href="/memos/create"
                        className="w-[340px] rounded-full bg-[#E57897] px-6 py-[14px] text-center text-semibold18 text-white"
                    >
                        작성하기
                    </Link>
                </div>
            </div>
        </PageContainer>
    );
}
