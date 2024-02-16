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

export default function CreateMemo() {
    const [charactersThumbnailResponse, setCharactersThumbnailResponse] =
        useState<null | GetCharactersThumbnailResponse>(null);

    useEffect(() => {
        getCharactersThumbnail({ accessToken: `${getCookie('accessToken')}` }).then((res) =>
            setCharactersThumbnailResponse(res as GetCharactersThumbnailResponse),
        );
    }, []);

    if (charactersThumbnailResponse?.length === 0) {
        return (
            <div className="fixed left-0 top-0 z-[10] h-[100vh] w-full bg-[#f5f5f5]">
                <div className="mx-auto h-full w-[400px] bg-white">
                    <NoCharacterHeader />
                    <NoCharacter />
                </div>
            </div>
        );
    }

    return (
        <div className="fixed left-0 top-0 z-[10] h-[100vh]  w-full bg-[#f5f5f5]">
            <div className="mx-auto h-full w-[400px] bg-white">
                <CreateMemoProvider>
                    <Header />
                    <MemoForm characters={charactersThumbnailResponse ?? []} />
                    <div className="mt-2 h-[12px] bg-[#F7F8F9]" />
                    <KeywordForm />
                </CreateMemoProvider>
            </div>
        </div>
    );
}
