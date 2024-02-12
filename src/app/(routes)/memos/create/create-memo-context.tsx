'use client';

import { ReactNode, createContext, useState } from 'react';

interface Keyword {
    id: number;
    keyword: string;
}

interface Context {
    keywords: Keyword[] | undefined;
    content: string;
    selectedCharacterId: string | undefined;
    changeContent: (value: string) => void;
    addKeywords: (keyword: Keyword) => void;
    deleteKeyword: (id: number) => void;
    changeCharacter: (id: string) => void;
}

export const CreateMemoContext = createContext<Context | null>(null);

interface Props {
    children: ReactNode;
}

export default function CreateMemoProvider({ children }: Props) {
    const [keywords, setKeywords] = useState<Keyword[] | undefined>(undefined);
    const [content, setContent] = useState('');
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | undefined>(undefined);

    const changeCharacter = (id: string) => {
        setSelectedCharacterId(id);
    };

    const changeContent = (value: string) => {
        setContent(value);
    };

    const addKeywords = (keyword: Keyword) => {
        if (keywords) {
            setKeywords([...keywords, keyword]);
        }
        setKeywords([keyword]);
    };
    const deleteKeyword = (id: number) => {
        if (!keywords) return;
        setKeywords(keywords.filter((keyword) => keyword.id !== id));
    };

    const context = {
        keywords,
        content,
        selectedCharacterId,
        changeContent,
        addKeywords,
        deleteKeyword,
        changeCharacter,
    };

    return <CreateMemoContext.Provider value={context}>{children}</CreateMemoContext.Provider>;
}
