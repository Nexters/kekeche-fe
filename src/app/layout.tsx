import { pretendard } from '@/assets/fonts/pretendard';
import { Toaster } from '@/components/ui-shadcn/toast/toaster';
import QueryClientContext from '@/context/query-client-context';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';

import './globals.css';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#ffffff',
};

export const metadata: Metadata = {
    applicationName: 'AnotherMe',
    title: '다양한 나를 키우는 AnotherMe',
    description: '나의 캐릭터별 성장기록 서비스',
    manifest: '/manifest.json',
    icons: [
        { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
        { rel: 'icon', url: '/icons/icon-128x128.png' },
        {
            url: '/splashscreens/iphone5_splash.png',
            media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
            rel: 'apple-touch-startup-image',
        },
        {
            url: '/splashscreens/iphone6_splash.png',
            media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
            rel: 'apple-touch-startup-image',
        },
        {
            url: '/splashscreens/iphoneplus_splash.png',
            media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
            rel: 'apple-touch-startup-image',
        },
        {
            url: '/splashscreens/iphonex_splash.png',
            media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
            rel: 'apple-touch-startup-image',
        },
        {
            url: '/splashscreens/iphonexr_splash.png',
            media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
            rel: 'apple-touch-startup-image',
        },
        {
            url: '/splashscreens/iphonexr_splash.png',
            media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
            rel: 'apple-touch-startup-image',
        },
        {
            url: '/splashscreens/iphonexr_splash.png',
            media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
            rel: 'apple-touch-startup-image',
        },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <head>
                <meta name="naver-site-verification" content="6f87b8170cef8604157538c5f66fffce3e688bc2" />
                <meta property="og:title" content={'다양한 나를 키우는 AnotherMe'} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={'https://kekeche-deploy.vercel.app/'} />
                <meta property="og:image" content={'/icons/og.png'} />
                <meta property="og:site_name" content={'Another Me'} />

                <link rel="apple-touch-icon" sizes="192x192" href="/assets/icons/icon-192x192.png" />
                <link rel="apple-touch-icon" sizes="512x512" href="/assets/icons/icon-512x512.png" />
            </head>
            <body className={pretendard.className}>
                <QueryClientContext>{children}</QueryClientContext>
                <Toaster />
                <GoogleAnalytics gaId="G-3ZH553JMHM" />
            </body>
        </html>
    );
}
