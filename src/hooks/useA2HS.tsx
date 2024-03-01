'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui-shadcn/alert-dialog';
import { deleteCookie, getCookie } from 'cookies-next';
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
    };

    return { deferredPrompt, install: installApp, clearPrompt };
};

export default function A2HS() {
    const { deferredPrompt, install, clearPrompt } = useA2HS();
    const as2hsCookie = getCookie('a2hs');

    const showDialog = deferredPrompt && !as2hsCookie;

    const [check, setCheck] = useState(false);

    return showDialog ? (
        <AlertDialog open={showDialog}>
            <AlertDialogContent className="w-[320px] rounded-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-[20px] text-bold18">
                        홈 화면에 앱설치 할까요?
                    </AlertDialogTitle>
                    <AlertDialogDescription>언제든 내 정보 탭에서 설치할 수 있어요</AlertDialogDescription>
                    <label className="mx-auto mb-5 flex items-center gap-1 text-[#3D4350]">
                        <input
                            className="rounded-[6px] border border-[#C6CBD8] bg-[#F7F8F9] bg-none caret-[#C6CBD8] accent-white"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    document.cookie = 'a2hs=true; max-age=2592000; path=/';

                                    return;
                                }
                                deleteCookie('a2hs');
                            }}
                            type="checkbox"
                        />
                        이 알림 다시 보지 않기
                    </label>
                    <div className="pt-[12px]">
                        <div className="flex items-center gap-3">
                            <AlertDialogCancel
                                asChild
                                className="ml-auto mt-0 bg-[#ECEFF5] hover:bg-[#ECEFF5] hover:text-[#8B92A0] focus-visible:ring-0"
                            >
                                <button
                                    className="h-[48px] w-[118px] rounded-[16px] px-6 py-[14px] text-center text-semibold18 text-[#8B92A0]"
                                    onClick={clearPrompt}
                                >
                                    취소
                                </button>
                            </AlertDialogCancel>
                            <AlertDialogAction
                                asChild
                                className="mr-auto mt-0 bg-[#2777ea] hover:bg-[#2777ea] hover:text-white focus-visible:ring-0"
                            >
                                <button
                                    className="h-[48px] w-[118px] rounded-[16px]  px-6 py-[14px] text-center text-semibold18 text-white"
                                    onClick={install}
                                >
                                    설치
                                </button>
                            </AlertDialogAction>
                        </div>
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    ) : (
        <></>
    );
}
