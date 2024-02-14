'use client';

import { ReactNode, createContext, useState } from 'react';

interface Context {
    keywords: number[] | undefined;
    content: string;
    selectedCharacterId: string | undefined;
    changeContent: (value: string) => void;
    toggleKeyword: (id: number) => void;
    changeCharacter: (id: string) => void;
}

export const CreateMemoContext = createContext<Context | null>(null);

interface Props {
    children: ReactNode;
}

export default function CreateMemoProvider({ children }: Props) {
    const [keywords, setKeywords] = useState<number[]>([]);
    const [content, setContent] = useState('');
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | undefined>(undefined);

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

    const context = {
        keywords,
        content,
        selectedCharacterId,
        toggleKeyword,
        changeContent,
        changeCharacter,
    };

    return <CreateMemoContext.Provider value={context}>{children}</CreateMemoContext.Provider>;
}
