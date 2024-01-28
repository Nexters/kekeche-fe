import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useState } from 'react';

export type CreateModalElement = (props: { isOpen: boolean; close: () => void; exit: () => void }) => JSX.Element;

interface Props {
    modalElement: CreateModalElement;
    onExit: () => void;
}

export interface ModalControlRef {
    close: () => void;
}

export const ModalController = forwardRef(function ModalController(
    { modalElement: ModalElement, onExit }: Props,
    ref: Ref<ModalControlRef>,
) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleModalClose = useCallback(() => setIsOpenModal(false), []);

    useImperativeHandle(
        ref,
        () => {
            return { close: handleModalClose };
        },
        [handleModalClose],
    );

    useEffect(() => {
        // NOTE: requestAnimationFrame이 없으면 가끔 Open 애니메이션이 실행되지 않는다.
        requestAnimationFrame(() => {
            setIsOpenModal(true);
        });
    }, []);

    return <ModalElement isOpen={isOpenModal} close={handleModalClose} exit={onExit} />;
});
