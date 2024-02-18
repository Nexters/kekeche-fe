'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui-shadcn/alert-dialog';
import { getCookie } from 'cookies-next';
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
            document.cookie = 'a2hs=true; max-age=86400; path=/';
        });
    };

    const clearPrompt = () => {
        setDeferredPrompt(null);
    };

    return { deferredPrompt, install: installApp, clearPrompt };
};

export default function A2HS() {
    const { deferredPrompt, install, clearPrompt } = useA2HS();
    const as2hsCookie = getCookie('a2hs');

    const showDialog = deferredPrompt && !as2hsCookie;

    return showDialog ? (
        <AlertDialog open={showDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>AnotherMe 바로가기를 추가하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <button onClick={clearPrompt}>취소</button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <button onClick={install}>홈 화면에 추가</button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ) : (
        <></>
    );
}
