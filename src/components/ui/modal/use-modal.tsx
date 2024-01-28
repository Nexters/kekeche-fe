import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ModalContext } from '@/context/modal-provider';
import { ModalController, ModalControlRef, CreateModalElement } from './modal-controller';

let elementId = 1;

interface Options {
    exitOnUnmount?: boolean;
}

export function useOverlay({ exitOnUnmount = true }: Options = {}) {
    const context = useContext(ModalContext);

    if (context == null) {
        throw new Error('useOverlay is only available within OverlayProvider.');
    }

    const { mount, unmount } = context;
    const [id] = useState(() => String(elementId++));

    const modalRef = useRef<ModalControlRef | null>(null);

    useEffect(() => {
        return () => {
            if (exitOnUnmount) {
                unmount(id);
            }
        };
    }, [exitOnUnmount, id, unmount]);

    return useMemo(
        () => ({
            open: (modalElement: CreateModalElement) => {
                mount(
                    id,
                    <ModalController
                        // NOTE: state should be reset every time we open an overlay
                        key={Date.now()}
                        ref={modalRef}
                        modalElement={modalElement}
                        onExit={() => {
                            unmount(id);
                        }}
                    />,
                );
            },
            close: () => {
                modalRef.current?.close();
            },
            exit: () => {
                unmount(id);
            },
        }),
        [id, mount, unmount],
    );
}
