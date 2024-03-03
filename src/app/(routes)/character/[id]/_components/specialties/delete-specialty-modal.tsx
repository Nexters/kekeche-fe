import deleteCharacterSpecialty from '@/services/character/deleteCharacterSpecialty';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import useCharacterIdBypath from '../../hooks/useCharacterIdBypath';
import AlertDialog from '@/components/dialog/alert-dialog';
import { DialogProps } from '@/components/dialog';

type Props = {
    deleteId: number;
    onDeleteCancel: () => void;
    onDeleteConfirm: () => void;
} & Pick<DialogProps, 'open' | 'onOpenChange'>;

export default function DeleteSpecialtyModal({
    deleteId,
    onDeleteCancel,
    onDeleteConfirm,
    onOpenChange,
    open,
    ...props
}: Props) {
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['character', 'specialties', characterId] });
            onDeleteConfirm();
        },
    });

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
            title="주특기를 삭제할까요?"
            description="삭제한 주특기는 되돌릴 수 없어요"
            leftText="취소"
            rightText="삭제"
            onConfirm={deleteSpecialty}
        />
    );
}
