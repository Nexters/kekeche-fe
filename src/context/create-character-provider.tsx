import { createContext, useCallback, useMemo, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

interface CreateCharacterValues {
    userId?: number;
    name?: string;
    color?: number;
    shape?: number;
    personality?: Array<number>;
    item?: number;
}

interface CreateCharacterDispatch {
    setValue<T extends keyof CreateCharacterValues>(target: T, value: CreateCharacterValues[T]): void;
}

export const CreateCharacterValuesContext = createContext<null | CreateCharacterValues>(null);
export const CreateCharacterDispatchContext = createContext<null | CreateCharacterDispatch>(null);

export default function CreateCharacterProvider({ children }: Props) {
    const [createCharacterValues, setCreateCharacterValues] = useState<CreateCharacterValues>({});

    const setValue = useCallback(
        <T extends keyof CreateCharacterValues>(target: T, value: CreateCharacterValues[T]) => {
            setCreateCharacterValues((prevValues) => {
                const newValues = { ...prevValues };
                newValues[target] = value;
                return newValues;
            });
        },
        [],
    );

    console.log(createCharacterValues);

    // 렌더링 최적화
    const memoizedSetValue = useMemo(() => ({ setValue }), [setValue]);

    return (
        <CreateCharacterValuesContext.Provider value={createCharacterValues}>
            <CreateCharacterDispatchContext.Provider value={memoizedSetValue}>
                {children}
            </CreateCharacterDispatchContext.Provider>
        </CreateCharacterValuesContext.Provider>
    );
}
