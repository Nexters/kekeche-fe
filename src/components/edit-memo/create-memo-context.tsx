'use client';

import { getMemoDetail } from '@/services/memo/getMemoDetail';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';

interface Context {
    keywords: number[] | undefined;
    content: string;
    selectedCharacterId: string | undefined;
    changeContent: (value: string) => void;
    toggleKeyword: (id: number) => void;
    changeCharacter: (id: string) => void;
    fetchLoading: boolean;
    selectId: string;
}

export const CreateMemoContext = createContext<Context | null>(null);

interface Props {
    id: number;
    children: ReactNode;
}

export default function CreateMemoProvider({ children, id }: Props) {
    const [keywords, setKeywords] = useState<number[]>([]);
    const [content, setContent] = useState('');
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | undefined>(undefined);
    const [fetchLoading, setFetchLoading] = useState(true);

    const selectIdRef = useRef('');
    const selectId = selectIdRef.current;

    const changeCharacter = (id: string) => {
        setSelectedCharacterId(id);
    };

    const changeContent = (value: string) => {
        setContent(value);
    };

    const toggleKeyword = (keywordId: number) => {
        if (keywords?.includes(keywordId)) {
            setKeywords(keywords.filter((id) => keywordId !== id));
        } else {
            setKeywords([...keywords, keywordId]);
        }
    };

    useEffect(() => {
        getMemoDetail(`${getCookie('accessToken')}`, Number(id)).then((res) => {
            setSelectedCharacterId(res.character.id + '');
            setContent(res.content);
            setFetchLoading(false);
            selectIdRef.current = `${res.character.id}`;
        });
    }, [id]);

    const context = {
        keywords,
        content,
        selectedCharacterId,
        toggleKeyword,
        changeContent,
        changeCharacter,
        fetchLoading,
        selectId,
    };

    if (fetchLoading) return null;

    return <CreateMemoContext.Provider value={context}>{children}</CreateMemoContext.Provider>;
}
