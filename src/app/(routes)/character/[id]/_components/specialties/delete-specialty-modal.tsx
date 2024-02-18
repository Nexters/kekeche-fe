import Modal, { ModalProps } from '@/components/ui/modal';
import { sendGTMEvent } from '@next/third-parties/google';
import { DialogClose } from '@radix-ui/react-dialog';

type Props = {
    onDeleteCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDeleteConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & Partial<ModalProps>;

export default function DeleteSpecialtyModal({ onDeleteCancel, onDeleteConfirm, ...props }: Props) {
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
                            onClick={onDeleteConfirm}
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
