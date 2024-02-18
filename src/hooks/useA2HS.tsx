'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui-shadcn/alert-dialog';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const useA2HS = () => {
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
        document.cookie = 'a2hs=true; max-age=2592000; path=/';
    };

    return { deferredPrompt, install: installApp, clearPrompt };
};

export default function A2HS() {
    const { deferredPrompt, install, clearPrompt } = useA2HS();
    const as2hsCookie = getCookie('a2hs');

    const showDialog = deferredPrompt && !as2hsCookie;

    return showDialog ? (
        <AlertDialog open={showDialog}>
            <AlertDialogContent className="w-[320px] rounded-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-start gap-2 text-left">
                        <Image
                            src="/icons/icon-192x192.png"
                            style={{ objectFit: 'cover' }}
                            alt=""
                            width={64}
                            height={64}
                        />
                        AnotherMe 바로가기를
                        <br /> 추가하시겠습니까?
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <button className="flex-1" onClick={clearPrompt}>
                            취소
                        </button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <button className="flex-1" onClick={install}>
                            홈 화면에 추가
                        </button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ) : (
        <></>
    );
}
