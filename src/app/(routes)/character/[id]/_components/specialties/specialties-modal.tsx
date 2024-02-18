import Modal, { ModalProps } from '@/components/ui/modal';
import { DialogClose } from '@radix-ui/react-dialog';
import ExitIcon from '@/assets/icons/exit_24x24.svg';
import PlusIcon from '@/assets/icons/plus_18x18.svg';
import SpecialtyBox from '../specialty-box';
import SpecialtyInput from '../specialty-input';
import { CharacterSpecialty } from '@/types/character';
import { useState } from 'react';
import { NewSpecialty } from '@/types/specialty';
import addCharacterSpecialties from '@/services/character/addCharacterSpecialties';
import { sendGTMEvent } from '@next/third-parties/google';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import useCharacterIdBypath from '../../hooks/useCharacterIdBypath';

type Props = {
    specialties: CharacterSpecialty[];
    onDelete: (id: number) => void;
} & Partial<ModalProps>;

export default function SpecialtiesModal({ specialties, onDelete, ...props }: Props) {
    const characterId = useCharacterIdBypath();
    const queryClient = useQueryClient();

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

    // 주특기 인풋 입력 핸들
    const handleNewSpecialty = (value: string, idx: number) => {
        setNewSpecialties((prev) => {
            const copy = [...prev];
            copy[idx].content = value.trimStart();
            return copy;
        });
    };

    // 주특기 인풋 제거 핸들
    const handleDeleteSpecialtyInput = (idx: number) => {
        setNewSpecialties((prev) => {
            const copy = [...prev.slice(0, idx), ...prev.slice(idx + 1, prev.length)];
            return copy;
        });
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
            <Modal
                className="h-auto w-[328px] px-[16px] pb-[32px] pt-[40px]"
                {...props}
                contents={
                    <>
                        <div className="flex flex-col gap-[12px]">
                            {specialties.map(({ id, content }) => (
                                <SpecialtyBox key={id}>
                                    <div className="flex w-full justify-between ">
                                        <span className="text-Subtitle2 text-newGray-900">{content}</span>
                                        <button onClick={() => onDelete(id)}>
                                            <ExitIcon />
                                        </button>
                                    </div>
                                </SpecialtyBox>
                            ))}
                        </div>
                        <div className="mt-[12px] flex w-full flex-col gap-[12px]">
                            {specialties.length < 4 &&
                                newSpecialties.map(({ content }, idx) => (
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
                                onClick={() => {
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
        </>
    );
}
