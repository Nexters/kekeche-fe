'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui-shadcn/alert-dialog';
import { Colors, Keywords } from '@/constants/character-info';
import createMemo, { CreateMemoResponse } from '@/services/memo/createMemo';
import { useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { CreateMemoContext } from './create-memo-context';

export default function Header() {
    const router = useRouter();
    const context = useContext(CreateMemoContext);
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [character, setCharacter] = useState<CreateMemoResponse | undefined>(undefined);

    const getColorFromUrl = (url: string) => {
        const match = url.match(/\/(\d+)\.webp$/);

        if (!match) return;

        const colorEnum = parseInt(match[1], 10);
        return Colors[colorEnum].hexClassName;
    };

    if (!context) return;

    return (
        <div className="mb-[10px] flex justify-between gap-2">
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
            <button
                onClick={async () => {
                    setLoading(true);
                    const res = await createMemo({
                        accessToken: `${getCookie('accessToken')}`,
                        content: context.content,
                        characterId: Number(context.selectedCharacterId),
                        specialtyIds: context.keywords ?? [],
                    });
                    await queryClient.invalidateQueries({ queryKey: ['allMemos'] });
                    await queryClient.invalidateQueries({
                        queryKey: ['character', 'memos', Number(context.selectedCharacterId)],
                    });

                    if (res?.isLevelUp) {
                        setShowDialog(true);
                        setCharacter(res);

                        return;
                    }

                    router.push(`/memos`);
                    router.refresh();
                }}
                disabled={
                    context?.memoInvalid || context?.content.length === 0 || !context?.selectedCharacterId || loading
                }
                className="p-3 text-semibold16 text-[#1E73F3] transition-colors disabled:pointer-events-none disabled:text-gray-300"
            >
                저장
            </button>
            {
                <AlertDialog open={showDialog}>
                    <AlertDialogContent className="w-[328px] border-0 px-0 py-9">
                        <AlertDialogHeader>
                            <AlertDialogTitle
                                className={`mx-auto flex w-fit items-center gap-1 rounded-full px-4 py-[6px] text-center ${getColorFromUrl(character?.characterImage || '')}`}
                            >
                                <svg
                                    width="33"
                                    height="33"
                                    viewBox="0 0 33 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M29.5234 6.51904H25.4091C23.4737 6.52174 21.5783 7.07044 19.9408 8.10209C18.3032 9.13374 16.99 10.6065 16.152 12.351C15.3139 10.6065 14.0007 9.13374 12.3631 8.10209C10.7256 7.07044 8.83022 6.52174 6.89481 6.51904H2.78052C2.50773 6.51904 2.24611 6.62741 2.05321 6.8203C1.86032 7.0132 1.75195 7.27482 1.75195 7.54761C1.75195 10.2756 2.83562 12.8918 4.76457 14.8207C5.71969 15.7758 6.85357 16.5335 8.10149 17.0504C9.34942 17.5673 10.6869 17.8333 12.0377 17.8333H15.1234V25.0333H14.0948C13.822 25.0333 13.5604 25.1417 13.3675 25.3346C13.1746 25.5275 13.0662 25.7891 13.0662 26.0619C13.0662 26.3347 13.1746 26.5963 13.3675 26.7892C13.5604 26.9821 13.822 27.0905 14.0948 27.0905H18.2091C18.4819 27.0905 18.7435 26.9821 18.9364 26.7892C19.1293 26.5963 19.2377 26.3347 19.2377 26.0619C19.2377 25.7891 19.1293 25.5275 18.9364 25.3346C18.7435 25.1417 18.4819 25.0333 18.2091 25.0333H17.1805V17.8333H20.2662C22.9942 17.8333 25.6104 16.7497 27.5393 14.8207C29.4683 12.8918 30.552 10.2756 30.552 7.54761C30.552 7.27482 30.4436 7.0132 30.2507 6.8203C30.0578 6.62741 29.7962 6.51904 29.5234 6.51904Z"
                                        fill="white"
                                    />
                                </svg>

                                <span className="w-fit rounded-full text-semibold24 text-white">{`LV.${character?.level}`}</span>
                            </AlertDialogTitle>
                            <AlertDialogDescription className="border-0">
                                <div className={'flex h-auto w-full flex-col items-center'}>
                                    <div className="relative h-[299px] w-[328px]">
                                        <Image
                                            quality={100}
                                            priority
                                            alt="캐릭터 이미지"
                                            src={character?.characterImage ?? ''}
                                            width={328}
                                            height={299}
                                            className="absolute left-0 top-0"
                                        />
                                        {character?.itemImage && (
                                            <Image
                                                quality={100}
                                                priority
                                                alt="아이템 이미지"
                                                src={character.itemImage}
                                                width={328}
                                                height={299}
                                                className="absolute left-0 top-0"
                                            />
                                        )}
                                    </div>
                                    <h3 className="mt-4 text-H1 text-black">{character?.name}</h3>
                                    <ul className="mt-[6px] flex gap-[4px]">
                                        {character?.keywords.map((keywordIdx) => (
                                            <li
                                                className={`rounded-[8px] bg-[#E0ECFF] px-[12px] py-[4px] text-[12px] font-[500] ${Keywords[keywordIdx].colorClassname}`}
                                                key={keywordIdx}
                                            >
                                                {Keywords[keywordIdx].name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction
                                className="mx-auto mt-4 w-4/5 bg-[#2777ea] py-6 text-white"
                                onClick={() => {
                                    router.push(`/character/${character?.id}`);
                                    router.refresh();
                                }}
                            >
                                확인
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }
        </div>
    );
}
