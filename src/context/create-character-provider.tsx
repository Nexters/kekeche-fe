'use client';

import { createContext, useCallback, useMemo, useRef, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

export interface CreateCharacterValues {
    userId?: number;
    name?: string;
    colorIdx?: number;
    shapeIdx?: number;
    keywords?: Array<number>;
    itemIdx?: number | null;
}

interface CreateCharacterDispatch {
    setValue<T extends keyof CreateCharacterValues>(target: T, value: CreateCharacterValues[T]): void;
}

export const CreateCharacterValuesContext = createContext<null | CreateCharacterValues>(null);
export const CreateCharacterDispatchContext = createContext<null | CreateCharacterDispatch>(null);

export default function CreateCharacterProvider({ children }: Props) {
    const createCharacterValues = useRef<CreateCharacterValues>({});

    const setValue = useCallback(
        <T extends keyof CreateCharacterValues>(target: T, value: CreateCharacterValues[T]) => {
            const prevValues = createCharacterValues.current;
            const newValues = { ...prevValues };
            newValues[target] = value;
            createCharacterValues.current = newValues;
        },
        [],
    );

    const memoizedSetValue = useMemo(() => ({ setValue }), [setValue]);

    return (
        <CreateCharacterValuesContext.Provider value={createCharacterValues.current}>
            <CreateCharacterDispatchContext.Provider value={memoizedSetValue}>
                {children}
            </CreateCharacterDispatchContext.Provider>
        </CreateCharacterValuesContext.Provider>
    );
}
