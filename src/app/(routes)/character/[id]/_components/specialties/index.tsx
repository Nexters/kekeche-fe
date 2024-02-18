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
import DeleteSpecialtyModal from './delete-specialty-modal';

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

    // 모달 상태
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 삭제 대상 저장
    const [deleteId, setDeleteId] = useState<null | number>(null);

    // 모달 배경 스크롤 핸들
    if (typeof document !== 'undefined') {
        if (isModifyModalOpen === true || isDeleteModalOpen === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setIsModifyModalOpen(false);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsModifyModalOpen(true);
        setDeleteId(null);
    };

    const handleDeleteConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsModifyModalOpen(true);
        deleteSpecialty();
        sendGTMEvent({ event: 'deleteSpecialty' });
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
            <DeleteSpecialtyModal
                onDeleteCancel={handleDeleteCancel}
                onDeleteConfirm={handleDeleteConfirm}
                open={isDeleteModalOpen && deleteId !== null}
                onOpenChange={setIsDeleteModalOpen}
            />
        </>
    );
}
