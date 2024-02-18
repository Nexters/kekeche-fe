'use client';

import ExitIcon from '@/assets/icons/exit_24x24.svg';
import LeafIcon from '@/assets/icons/leaf_24x24.svg';
import PlusIcon from '@/assets/icons/plus_18x18.svg';
import Modal from '@/components/ui/modal';
import addCharacterSpecialties from '@/services/character/addCharacterSpecialties';
import deleteCharacterSpecialty from '@/services/character/deleteCharacterSpecialty';
import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';
import { NewSpecialty } from '@/types/specialty';
import { sendGTMEvent } from '@next/third-parties/google';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SpecialtyBox from './specialty-box';
import SpecialtyInput from './specialty-input';

export default function Specialties() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const queryClient = useQueryClient();

    const {
        data: { specialties },
    } = useSuspenseQuery({
        queryKey: ['character', 'specialties', characterId],
        queryFn: () => getCharacterSpecialty({ accessToken: `${getCookie('accessToken')}`, characterId }),
        staleTime: 1000 * 60 * 5,
    });

    const { mutate: deleteSpecialty } = useMutation({
        mutationFn: () =>
            deleteCharacterSpecialty({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
                specialtyId: deleteId as number, //NOTE: deleteId가 null인 경우에 mutation이 일어날 수가 없음.
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['character', 'specialties', characterId] });
            setDeleteId(null);
        },
    });

    const { mutate: addSpecialties } = useMutation({
        mutationFn: (newSpecialties: NewSpecialty[]) =>
            addCharacterSpecialties({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
                specialties: newSpecialties,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['character', 'specialties', characterId] });
            setNewSpecialties([{ content: '' }]);
        },
    });

    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<null | number>(null);
    const [newSpecialties, setNewSpecialties] = useState<NewSpecialty[]>(
        specialties.length === 4 ? [] : [{ content: '' }],
    );
    const isNewSpecialtiesClean =
        (newSpecialties.length === 1 && newSpecialties[0].content === '') || newSpecialties.length === 0;

    const handleAddSpecailtyInput = () => {
        setNewSpecialties((prev) => [...prev, { content: '' }]);
    };

    const handleDeleteSpecialtyInput = (idx: number) => {
        setNewSpecialties((prev) => {
            const copy = [...prev.slice(0, idx), ...prev.slice(idx + 1, prev.length)];
            return copy;
        });
    };

    const handleNewSpecialty = (value: string, idx: number) => {
        setNewSpecialties((prev) => {
            const copy = [...prev];
            copy[idx].content = value.trimStart();
            return copy;
        });
    };

    const handleSubmitNewSpecialties = () => {
        if (!isNewSpecialtiesClean) {
            // 입력값이 없는 인풋은 뮤테이션에 포함시키지 않습니다.
            const copy = [...newSpecialties].filter((specialty) => specialty.content.length > 0);
            addSpecialties(copy);
            sendGTMEvent({ event: 'addSpecialty' });
        }
    };

    if (isModifyModalOpen === true || isDeleteModalOpen === true) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    return (
        <>
            <div className="mx-auto mt-[16px] h-auto w-[327px] rounded-[16px] bg-white px-[24px] py-[12px]">
                <div className="flex w-full gap-[180px] py-[12px]">
                    <div className="flex gap-[4px]">
                        <LeafIcon />
                        <span className="text-[16px] font-[600] text-newGray-900">주특기</span>
                    </div>
                    <button onClick={() => setIsModifyModalOpen(true)}>
                        <PlusIcon />
                    </button>
                </div>
                {specialties.length > 0 ? (
                    <div className="mt-[8px] flex w-full flex-col gap-[4px]">
                        {specialties.map(({ id, content, memoCnt }) => (
                            <div
                                key={id}
                                className="mr-[9.95px] flex h-[53px] w-full justify-between rounded-[12px] bg-[#F8F8F8] p-[16px] text-[14px] font-[600] text-primary-500 "
                            >
                                <span>{content}</span>
                                <span>{memoCnt}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mb-[12px] mt-[8px] flex h-[74px] w-full rounded-[12px] border border-newGray-200 bg-newGray-100 px-[16px] py-[16px]">
                        <span className="whitespace-pre-line text-[14px] font-[600] text-newGray-500">
                            {'아직 생성된 주특기가 하나도 없어요!\n플러스를 눌러 만들어주세요.'}
                        </span>
                    </div>
                )}
            </div>
            <Modal
                className="h-auto w-[328px] px-[16px] pb-[32px] pt-[40px]"
                open={isModifyModalOpen}
                onOpenChange={setIsModifyModalOpen}
                contents={
                    <>
                        <div className="flex flex-col gap-[12px]">
                            {specialties.map(({ id, content }) => (
                                <SpecialtyBox key={id}>
                                    <div className="flex w-full justify-between ">
                                        <span className="text-Subtitle2 text-newGray-900">{content}</span>
                                        <button
                                            onClick={() => {
                                                setDeleteId(id);
                                                setIsModifyModalOpen(false);
                                                setIsDeleteModalOpen(true);
                                            }}
                                        >
                                            <ExitIcon />
                                        </button>
                                    </div>
                                </SpecialtyBox>
                            ))}
                        </div>
                        <div className="mt-[12px] flex w-full flex-col gap-[12px]">
                            {newSpecialties.map(({ content }, idx) => (
                                <SpecialtyInput
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleNewSpecialty(e.currentTarget.value, idx)
                                    }
                                    onDelete={() => handleDeleteSpecialtyInput(idx)}
                                    value={content}
                                    key={idx}
                                    canDelete={idx !== 0}
                                />
                            ))}
                            {newSpecialties.length + specialties.length < 4 && (
                                <button
                                    onClick={handleAddSpecailtyInput}
                                    className="flex h-[48px] w-[296px] items-center justify-center rounded-[12px] bg-newGray-200 "
                                >
                                    <PlusIcon />
                                </button>
                            )}
                        </div>
                        <div className="mt-[24px] flex w-full gap-[8px]">
                            <DialogClose
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsModifyModalOpen(false);
                                    setNewSpecialties([{ content: '' }]);
                                }}
                                onKeyUp={(e) => e.preventDefault()}
                                className="h-[48px] w-full flex-1 rounded-[8px] bg-newGray-200 text-[16px] font-[600] text-newGray-800 "
                            >
                                취소
                            </DialogClose>
                            <DialogClose
                                onKeyUp={(e) => e.preventDefault()}
                                onClick={handleSubmitNewSpecialties}
                                className="h-[48px] w-full flex-1 rounded-[8px] bg-primary-500  text-[16px] font-[600] text-white disabled:bg-[#c4caf8]"
                            >
                                저장
                            </DialogClose>
                        </div>
                    </>
                }
                title="주특기 관리"
                description={'4개까지 생성 가능하고\n주특기 이름은 수정 불가합니다'}
            />
            <Modal
                open={isDeleteModalOpen && deleteId !== null}
                onOpenChange={setIsDeleteModalOpen}
                title="주특기를 삭제할까요?"
                description="삭제한 주특기는 되돌릴 수 없어요"
                contents={
                    <>
                        <div className=" flex w-full  gap-[8px]">
                            <DialogClose
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModifyModalOpen(true);
                                    setDeleteId(null);
                                }}
                                className="h-[48px] flex-1 rounded-[8px] bg-newGray-200 text-[16px] font-[600] text-newGray-600 "
                            >
                                취소
                            </DialogClose>
                            <DialogClose
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModifyModalOpen(true);
                                    deleteSpecialty();
                                    sendGTMEvent({ event: 'deleteSpecialty' });
                                }}
                                className="h-[48px] flex-1 rounded-[8px] bg-[#F06371] text-[16px] font-[600]  text-white "
                            >
                                삭제
                            </DialogClose>
                        </div>
                    </>
                }
            />
        </>
    );
}
