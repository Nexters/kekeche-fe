import Modal, { ModalProps } from '@/components/ui/modal';
import deleteCharacterSpecialty from '@/services/character/deleteCharacterSpecialty';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import useCharacterIdBypath from '../../hooks/useCharacterIdBypath';

type Props = {
    deleteId: number;
    onDeleteCancel: () => void;
    onDeleteConfirm: () => void;
} & Partial<ModalProps>;

export default function DeleteSpecialtyModal({ deleteId, onDeleteCancel, onDeleteConfirm, ...props }: Props) {
    const characterId = useCharacterIdBypath();
    const queryClient = useQueryClient();

    // 주특기 삭제
    const { mutate: deleteSpecialty } = useMutation({
        mutationFn: () =>
            deleteCharacterSpecialty({
                accessToken: `${getCookie('accessToken')}`,
                characterId,
                specialtyId: deleteId,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['character', 'specialties', characterId] });
            onDeleteConfirm();
        },
    });

    return (
        <Modal
            {...props}
            title="주특기를 삭제할까요?"
            description="삭제한 주특기는 되돌릴 수 없어요"
            contents={
                <>
                    <div className=" flex w-full  gap-[8px]">
                        <DialogClose
                            onClick={onDeleteCancel}
                            className="h-[48px] flex-1 rounded-[8px] bg-newGray-200 text-[16px] font-[600] text-newGray-600 "
                        >
                            취소
                        </DialogClose>
                        <DialogClose
                            onClick={() => deleteSpecialty()}
                            className="h-[48px] flex-1 rounded-[8px] bg-[#F06371] text-[16px] font-[600]  text-white "
                        >
                            삭제
                        </DialogClose>
                    </div>
                </>
            }
        />
    );
}
