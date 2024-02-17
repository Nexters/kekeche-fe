'use client';

import getCharactersThumbnail, { GetCharactersThumbnailResponse } from '@/services/character/getCharactersThumbnail';
import CreateMemoProvider from './create-memo-context';
import Header from './header';
import KeywordForm from './keyword-form';
import MemoForm from './memo-form';
import NoCharacter from './no-character';
import NoCharacterHeader from './no-character-header';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

type Props = {
    characterId: string | null;
};

export default function CreateMemo({ characterId }: Props) {
    const [charactersThumbnailResponse, setCharactersThumbnailResponse] =
        useState<null | GetCharactersThumbnailResponse>(null);

    useEffect(() => {
        getCharactersThumbnail({ accessToken: `${getCookie('accessToken')}` }).then((res) =>
            setCharactersThumbnailResponse(res as GetCharactersThumbnailResponse),
        );
    }, []);

    if (charactersThumbnailResponse?.length === 0) {
        return (
            <>
                <NoCharacterHeader />
                <NoCharacter />
            </>
        );
    }

    return (
        <>
            <CreateMemoProvider characterId={characterId}>
                <Header />
                <MemoForm characters={charactersThumbnailResponse ?? []} />
                <div className="mt-2 h-[12px] bg-[#F7F8F9]" />
                <KeywordForm />
            </CreateMemoProvider>
        </>
    );
}
