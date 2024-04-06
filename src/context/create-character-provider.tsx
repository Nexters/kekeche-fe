'use client';

import { createContext, useCallback, useContext, useMemo, useRef } from 'react';

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

interface CreateCharacterContext {
    setValue<T extends keyof CreateCharacterValues>(target: T, value: CreateCharacterValues[T]): void;
    getValue<T extends keyof CreateCharacterValues>(target: T): CreateCharacterValues[T];
    getValues(): CreateCharacterValues;
}

export const CreateCharacterContext = createContext<null | CreateCharacterContext>(null);

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

    const getValue = useCallback(<T extends keyof CreateCharacterValues>(target: T) => {
        return createCharacterValues.current[target];
    }, []);

    const getValues = useCallback(() => {
        return createCharacterValues.current;
    }, []);

    const memoizedValue = useMemo(() => ({ setValue, getValue, getValues }), [getValue, getValues, setValue]);

    return <CreateCharacterContext.Provider value={memoizedValue}>{children}</CreateCharacterContext.Provider>;
}

export function useCreateCharacterContext() {
    const createCharacterContext = useContext(CreateCharacterContext);

    if (createCharacterContext === null) {
        throw new Error('CreateCharacterContext를 감싸서 사용하세요.');
    }

    return createCharacterContext;
}
