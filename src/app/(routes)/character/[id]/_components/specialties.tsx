'use client';

import LeafIcon from '@/assets/icons/leaf_24x24.svg';
import ExitIcon from '@/assets/icons/exit_24x24.svg';
import PlusIcon from '@/assets/icons/plus_18x18.svg';
import Modal from '@/components/ui/modal';
import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SpecialtyBox from './specialty-box';
import deleteCharacterSpecialty from '@/services/character/deleteCharacterSpecialty';

export default function Specialties() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);

    const queryClient = useQueryClient();

    const {
        data: { specialties },
    } = useSuspenseQuery({
        queryKey: ['character', 'specialties', characterId],
        queryFn: () => getCharacterSpecialty({ accessToken: `${getCookie('accessToken')}`, characterId }),
    });

    const { mutate: deleteSpecialty } = useMutation({
        mutationFn: () =>
            deleteCharacterSpecialty({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
                specialtyId: deleteId as number,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['character', 'specialties', characterId] });
            setDeleteId(null);
        },
    });

    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<null | number>(null);
    const [newSpecialties, setNewSpecialties] = useState<{ content: string }[]>([{ content: '' }]);

    const handleNewSpecialty = (value: string, idx: number) => {
        setNewSpecialties((prev) => {
            const copy = [...prev];
            copy[idx].content = value;
            return copy;
        });
    };

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
                                <SpecialtyBox key={idx}>
                                    <input
                                        onKeyDown={(e) => {
                                            if (e.key === ' ') {
                                                console.log('dd');
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }
                                        }}
                                        className="bg-inherit flex h-full w-full items-center border-none bg-newGray-100 p-0 text-Subtitle2 text-newGray-900 outline-none outline-newGray-100"
                                        placeholder="공백 포함 최대 10자"
                                        value={content}
                                        onChange={(e) => handleNewSpecialty(e.currentTarget.value, idx)}
                                    />
                                </SpecialtyBox>
                            ))}
                            {newSpecialties.length + specialties.length < 4 && (
                                <button className="flex h-[48px] w-[296px] items-center justify-center rounded-[12px] bg-newGray-200 ">
                                    <PlusIcon />
                                </button>
                            )}
                        </div>
                        <div className="mt-[24px] flex w-full  gap-[8px]">
                            <button
                                onKeyDown={(e) => e.stopPropagation()}
                                className="h-[48px]  flex-1 rounded-[8px] bg-newGray-200 text-[16px] font-[600] text-newGray-800 "
                            >
                                취소
                            </button>
                            <button
                                onKeyDown={(e) => e.stopPropagation()}
                                className="h-[48px] flex-1 rounded-[8px] bg-primary-500  text-[16px] font-[600] text-white disabled:bg-[#c4caf8]"
                            >
                                저장
                            </button>
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
