'use client';

import { ReactNode, createContext, useState } from 'react';

interface Keyword {
    id: number;
    keyword: string;
}

interface Context {
    keywords: Keyword[] | undefined;
    content: string;
    changeContent: (value: string) => void;
    addKeywords: (keyword: Keyword) => void;
    deleteKeyword: (id: number) => void;
}

const CreateMemoContext = createContext<Context | null>(null);

interface Props {
    children: ReactNode;
}

export default function CreateMemoProvider({ children }: Props) {
    const [keywords, setKeywords] = useState<Keyword[] | undefined>(undefined);
    const [content, setContent] = useState('');

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
        changeContent,
        addKeywords,
        deleteKeyword,
    };

    return <CreateMemoContext.Provider value={context}>{children}</CreateMemoContext.Provider>;
}
