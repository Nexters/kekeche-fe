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
import { useState } from 'react';
import SpecialtyBox from '../specialty-box';
import SpecialtyInput from '../specialty-input';
import useCharacterIdBypath from '../../hooks/useCharacterIdBypath';
import SpecialtiesModal from './specialties-modal';

export default function Specialties() {
    const characterId = useCharacterIdBypath();

    const queryClient = useQueryClient();

    // 캐릭터 주특기 불러오기
    const {
        data: { specialties },
    } = useSuspenseQuery({
        queryKey: ['character', 'specialties', characterId],
        queryFn: () => getCharacterSpecialty({ accessToken: `${getCookie('accessToken')}`, characterId }),
        staleTime: 1000 * 60 * 5,
    });

    // 주특기 삭제
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

    // 주특기 생성(추가)
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

    // 모달 상태
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 삭제 대상 저장
    const [deleteId, setDeleteId] = useState<null | number>(null);

    // 추가할 새로운 주특기
    const [newSpecialties, setNewSpecialties] = useState<NewSpecialty[]>(
        specialties.length === 4 ? [] : [{ content: '' }],
    );
    // 모달에 새로운 주특기 입력 여부
    const isNewSpecialtiesClean =
        (newSpecialties.length === 1 && newSpecialties[0].content === '') || newSpecialties.length === 0;

    // 주특기 인풋 추가 핸들
    const handleAddSpecailtyInput = () => {
        setNewSpecialties((prev) => [...prev, { content: '' }]);
    };

    // 주특기 인풋 제거 핸들
    const handleDeleteSpecialtyInput = (idx: number) => {
        setNewSpecialties((prev) => {
            const copy = [...prev.slice(0, idx), ...prev.slice(idx + 1, prev.length)];
            return copy;
        });
    };

    // 주특기 인풋 입력 핸들
    const handleNewSpecialty = (value: string, idx: number) => {
        setNewSpecialties((prev) => {
            const copy = [...prev];
            copy[idx].content = value.trimStart();
            return copy;
        });
    };

    // 모달 배경 스크롤 핸들
    if (isModifyModalOpen === true || isDeleteModalOpen === true) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    /////////////

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setIsModifyModalOpen(false);
        setIsDeleteModalOpen(true);
    };

    // 주특기 생성 ('완료' 클릭)
    const handleSubmitNewSpecialties = () => {
        if (!isNewSpecialtiesClean) {
            // 입력값이 없는 인풋은 뮤테이션에 포함시키지 않습니다.
            const copy = [...newSpecialties].filter((specialty) => specialty.content.length > 0);
            addSpecialties(copy);
            sendGTMEvent({ event: 'addSpecialty' });
        }
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
            <SpecialtiesModal
                specialties={specialties}
                handleDelete={handleDelete}
                open={isModifyModalOpen}
                onOpenChange={setIsModifyModalOpen}
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
