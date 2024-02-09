'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import FlowerIcon from '@/assets/icons/flower_pink_20x20.svg';
import MeatballIcon from '@/assets/icons/meatball_20x20.svg';
import PencilIcon from '@/assets/icons/pencil_24x24.svg';
import TrashIcon from '@/assets/icons/trash_24x24.svg';
import { PageContainer } from '@/components/ui';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui-shadcn/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-shadcn/popover';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';
import Modal from '@/components/ui/modal';
import getMember, { GetMemberResponse } from '@/services/auth/getMember';
import removeCharacterName from '@/services/character/deleteCharacterName';
import editCharacterName from '@/services/character/editCharacterName';
import getCharacterDetail, { GetCharacterDetailResponse } from '@/services/character/getCharacterDetail';
import { getCharacterMemos } from '@/services/character/getCharacterMemos';
import { AllMemos } from '@/types/memo';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Memo from '../../memos/_components/memo';
import NoMemo from '../../memos/_components/no-memo';
import { Keywords } from '@/constants/character-info';
import TopBar from '@/components/ui/top-bar';

export default function CharacterDetail({ params: { id } }: { params: { id: number } }) {
    const [memberResponse, setMemberResponse] = useState<GetMemberResponse | undefined>(undefined);
    const [detailData, setDetailData] = useState<GetCharacterDetailResponse | undefined>(undefined);
    const [popup, setPopup] = useState<'edit' | 'delete' | undefined>(undefined);
    const [draftName, setDraftName] = useState<string | undefined>(undefined);
    const { toast } = useToast();

    const [memosResponse, setMemosResponse] = useState<AllMemos | undefined>(undefined);

    useEffect(() => {
        if (detailData?.id) {
            getCharacterMemos({
                accessToken: `${getCookie('accessToken')}`,
                characterId: detailData?.id,
            }).then((res) => setMemosResponse(res));
        }
    }, [detailData?.id]);

    const router = useRouter();
    useEffect(() => {
        getMember({ accessToken: getCookie('accessToken') }).then((res) => setMemberResponse(res));
    }, []);

    useEffect(() => {
        if (id) {
            getCharacterDetail({
                accessToken: getCookie('accessToken'),
                characterId: id,
            }).then((res) => {
                setDetailData(res);
                setDraftName(detailData?.name);
            });
        }
    }, [id, detailData?.name]);

    console.log(memosResponse);

    return (
        <PageContainer>
            <div className="relative pb-24">
                <section>
                    <TopBar>
                        <TopBar.Left>
                            <button
                                onClick={() => {
                                    router.push(`/${memberResponse?.memberId}`);
                                }}
                                aria-label="뒤로 가기 버튼"
                                className="p-3"
                            >
                                <BackArrowIcon fill="#3D4350" />
                            </button>
                        </TopBar.Left>
                        <TopBar.Text>캐릭터 상세</TopBar.Text>
                        <TopBar.Right>
                            <Popover modal>
                                <PopoverTrigger className="p-3">
                                    <MeatballIcon />
                                </PopoverTrigger>
                                <PopoverContent className="shadow-[0_4px_16px_0_rgba(0, 0, 0, 0.16)] mr-3 w-fit rounded-[8px] border-none p-3">
                                    <Dialog>
                                        <DialogTrigger className="flex items-center gap-1">
                                            <PencilIcon stroke="#4B4F58" />
                                            <span className="text-semibold16 text-gray-600">수정</span>
                                        </DialogTrigger>
                                        <DialogContent className="w-[300px] px-6 py-9">
                                            <DialogHeader>
                                                <DialogTitle className="mb-5 text-center">이름 수정</DialogTitle>
                                                <DialogDescription className="flex justify-center">
                                                    <input
                                                        className="h-[48px] w-full rounded-lg px-4 outline outline-[#E8EAEE]"
                                                        value={draftName}
                                                        onChange={(e) => {
                                                            setDraftName(e.target.value);
                                                        }}
                                                    />
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="flex gap-3">
                                                <DialogClose className="flex-1  rounded-xl bg-gray-200 py-3">
                                                    취소
                                                </DialogClose>
                                                <DialogClose
                                                    disabled={!draftName || draftName.length > 6}
                                                    onClick={() => {
                                                        if (detailData?.id)
                                                            editCharacterName({
                                                                accessToken: `${getCookie('accessToken')}`,
                                                                characterId: detailData?.id,
                                                                characterName: `${draftName}`,
                                                            });

                                                        location.reload();
                                                    }}
                                                    className="flex-1 rounded-xl bg-[#606fd8] py-3 text-white disabled:bg-[#c4caf8]"
                                                >
                                                    완료
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <div className="mx-[-12px] my-1 h-[1px] bg-gray-200" />
                                    <Dialog>
                                        <DialogTrigger className="flex items-center gap-1">
                                            <TrashIcon stroke="#F04141" />
                                            <span className="text-semibold16 text-[#F04141]">삭제</span>
                                        </DialogTrigger>
                                        <DialogContent className="w-[300px] px-6 py-9">
                                            <DialogHeader>
                                                <DialogTitle className="mb-5 text-center">
                                                    캐릭터를 삭제할까요?
                                                </DialogTitle>
                                                <DialogDescription className="text-center">
                                                    삭제한 캐릭터는 되돌릴 수 없어요
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="flex gap-3">
                                                <DialogClose className="flex-1  rounded-xl bg-gray-200 py-3">
                                                    취소
                                                </DialogClose>
                                                <DialogClose
                                                    disabled={!draftName || draftName.length > 6}
                                                    onClick={() => {
                                                        if (
                                                            memberResponse?.characterCount &&
                                                            memberResponse?.characterCount === 1
                                                        ) {
                                                            toast({
                                                                description: '마지막 캐릭터는 삭제할 수 없어요',
                                                            });
                                                            return;
                                                        }
                                                        if (detailData?.id)
                                                            removeCharacterName({
                                                                accessToken: `${getCookie('accessToken')}`,
                                                                characterId: detailData?.id,
                                                            });
                                                        location.reload();
                                                        router.push(`/${memberResponse?.memberId}`);
                                                    }}
                                                    className="flex-1 rounded-xl  bg-[#f06371] py-3 text-white"
                                                >
                                                    삭제
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </PopoverContent>
                            </Popover>
                        </TopBar.Right>
                    </TopBar>
                    <div className="flex flex-col items-center">
                        <div className="mb-5 flex w-[87px] items-center justify-center gap-1 rounded-full bg-[#C4CAF7]  px-[14px] py-[6px]">
                            <FlowerIcon fill={'#606FD8'} />
                            <span className="text-bold16 font-bold text-[#606FD8]">Lv.{detailData?.level}</span>
                        </div>
                        <div className="relative mb-5 h-[280px] w-[280px] rounded-[20px] bg-[#F7F7FB]">
                            {detailData?.characterImage ? (
                                <Image
                                    priority
                                    width={280}
                                    height={280}
                                    src={detailData?.characterImage}
                                    alt={detailData?.name || ''}
                                />
                            ) : null}
                            {detailData?.itemImage && (
                                <Image
                                    priority
                                    src={detailData.itemImage}
                                    alt={'아이템 미리보기'}
                                    className="absolute left-0 top-0"
                                    width={280}
                                    height={280}
                                />
                            )}
                        </div>
                        <div className="mb-4 rounded-2xl p-5">
                            <div className="mb-[10px] flex items-center justify-center gap-2">
                                <p className="text-semibold24 text-gray-600">{detailData?.name}</p>
                            </div>
                            <div className="flex gap-[6px] text-semibold14 text-gray-300">
                                {detailData?.keywords.map((keyword, i) => (
                                    <span key={i} className="rounded-full bg-gray-200 px-3 py-1">
                                        {Keywords[keyword].name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="h-[24px]">
                            <div className="flex items-center gap-2">
                                <span className="relative h-[18px] w-[210px] flex-1 rounded-full bg-gray-200">
                                    <span
                                        className="inest-0 absolute h-full rounded-full bg-[#606FD8]"
                                        style={{
                                            width: `${((detailData?.currentExp ?? 0) / (detailData?.nextExp ?? 0)) * 100}%`,
                                        }}
                                    />
                                </span>
                                <span className="text-bold16 text-[#8E939E]">
                                    {detailData?.currentExp}/{detailData?.nextExp}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="mt-10 h-[12px] w-full bg-[#F0F1F7]" />
                <section>
                    <div className="p-6 text-semibold18 text-contentPrimaryLight">
                        메모 {memosResponse?.memos.length ?? 0}
                    </div>
                    <div className="flex flex-col items-center gap-[16px] ">
                        {memosResponse?.memos.length === 0 ? (
                            <NoMemo />
                        ) : (
                            memosResponse?.memos.map((memo) => <Memo key={memo.id} memo={memo} />)
                        )}
                    </div>
                </section>
                <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center py-4">
                    <Link
                        href="/memos/create"
                        className="w-[340px] rounded-full bg-[#606FD8] px-6 py-[14px] text-center text-semibold18 text-white"
                    >
                        작성하기
                    </Link>
                </div>
            </div>
            {popup === 'edit' && (
                <Modal
                    triggerElement={<button>모달 ㄱ</button>}
                    title="모달 테스트중.."
                    description="모달이 잘 작동할까요"
                    contents={'asd'}
                />
            )}
            {popup === 'delete' && (
                <Modal
                    triggerElement={<button>모달 ㄱ</button>}
                    title="모달 테스트중.."
                    description="모달이 잘 작동할까요"
                    contents={'asd'}
                />
            )}
        </PageContainer>
    );
}
