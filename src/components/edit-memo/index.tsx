'use client';

import { PageContainer } from '@/components/ui';
import getCharactersThumbnail, { GetCharactersThumbnailResponse } from '@/services/character/getCharactersThumbnail';
import CreateMemoProvider from './create-memo-context';
import Header from './header';
import KeywordForm from './keyword-form';
import MemoForm from './memo-form';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';

export default function EditMemo({ id }: { id: number }) {
    const [charactersThumbnailResponse, setCharactersThumbnailResponse] =
        useState<null | GetCharactersThumbnailResponse>(null);

    useEffect(() => {
        getCharactersThumbnail({ accessToken: `${getCookie('accessToken')}` }).then((res) =>
            setCharactersThumbnailResponse(res as GetCharactersThumbnailResponse),
        );
    }, []);

    return (
        <div className="fixed left-0 top-0 z-[10] h-[100vh] w-full bg-[#f5f5f5]">
            <div className="mx-auto h-full w-[400px] bg-white">
                <CreateMemoProvider id={id}>
                    <Header id={id} />
                    <MemoForm characters={charactersThumbnailResponse ?? []} />
                    <div className="mt-2 h-[12px] bg-[#F7F8F9]" />
                    <KeywordForm />
                </CreateMemoProvider>
            </div>
        </div>
    );
}
