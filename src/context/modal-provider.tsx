import React, { createContext, PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';

export const ModalContext = createContext<{
    mount(id: string, element: ReactNode): void;
    unmount(id: string): void;
} | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
    const [modalById, setModalById] = useState<Map<string, ReactNode>>(new Map());

    const mount = useCallback((id: string, element: ReactNode) => {
        setModalById((modalById) => {
            const cloned = new Map(modalById);
            cloned.set(id, element);
            return cloned;
        });
    }, []);

    const unmount = useCallback((id: string) => {
        setModalById((modalById) => {
            const cloned = new Map(modalById);
            cloned.delete(id);
            return cloned;
        });
    }, []);

    const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

    return (
        <ModalContext.Provider value={context}>
            {children}
            {[...Object.entries(modalById)].map(([id, element]) => (
                <React.Fragment key={id}>{element}</React.Fragment>
            ))}
        </ModalContext.Provider>
    );
}
