'use client';

import { useContext } from 'react';
import { CreateCharacterContext } from '@/context/create-character-provider';

export default function useCreateCharacter() {
    const createCharacterDispatch = useContext(CreateCharacterContext);

    if (createCharacterDispatch === null) throw new Error('CreateCharacter Provider를 감싸서 사용하세요');

    return createCharacterDispatch;
}
