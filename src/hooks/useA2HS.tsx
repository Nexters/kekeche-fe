'use client';

import { useEffect, useState } from 'react';

const useA2HS = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const installApp = () => {
        //@ts-ignore
        deferredPrompt?.prompt();
        //@ts-ignore
        deferredPrompt?.userChoice.then((choiceResult) => {
            clearPrompt();
        });
    };

    const clearPrompt = () => {
        setDeferredPrompt(null);
    };

    return { deferredPrompt, install: installApp, clearPrompt };
};

export default function A2HS() {
    const { deferredPrompt, install, clearPrompt } = useA2HS();

    return deferredPrompt ? (
        <div>
            <button onClick={clearPrompt}>취소</button>
            <button onClick={install}>홈 화면에 추가</button>
        </div>
    ) : null;
}
