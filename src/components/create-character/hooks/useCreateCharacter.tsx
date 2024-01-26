import { useContext } from 'react';
import { CreateCharacterDispatchContext } from '@/context/create-character-provider';

export default function useCreateCharacter() {
    const createCharacterValues = useContext(CreateCharacterDispatchContext);

    if (createCharacterValues === null) throw new Error('CreateCharacterValuesContext Provider를 감싸서 사용하세요');

    return createCharacterValues;
}
