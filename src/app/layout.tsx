import { pretendard } from '@/assets/fonts/pretendard';
import { Toaster } from '@/components/ui-shadcn/toast/toaster';
import QueryClientContext from '@/context/query-client-context';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';

import MemoOverlay from '@/components/create-character/memo-overlay';
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
        { rel: 'apple-touch-icon', url: '/icons/icon-512x512.png' },
        { rel: 'icon', url: '/icons/icon-128x128.png' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <head>
                <meta name="naver-site-verification" content="6f87b8170cef8604157538c5f66fffce3e688bc2" />
                <meta property="og:title" content={'다양한 나를 키우는 AnotherMe'} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={'https://anotherme.today'} />
                <meta property="og:image" content={'/icons/og.png'} />
                <meta property="og:site_name" content={'AnotherMe'} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="apple-mobile-web-app-capable" content="yes"></meta>
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
                <link rel="apple-touch-icon" sizes="192x192" href="/assets/icons/icon-192x192.png" />
                <link rel="apple-touch-icon" sizes="512x512" href="/assets/icons/icon-512x512.png" />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
                    href="/assets/splashscreens/iphonex_splash.png"
                />
                {/* <link
                    rel="apple-touch-startup-image"
                    href="/assets/splashscreens/iphonex_splash.png"
                    sizes="2048x2732"
                /> */}
            </head>
            <body className={pretendard.className}>
                <QueryClientContext>
                    {children}
                    <MemoOverlay />
                </QueryClientContext>
                <Toaster />
                <GoogleAnalytics gaId="G-3ZH553JMHM" />
                <GoogleTagManager gtmId="GTM-MDK2WKJX" />
            </body>
        </html>
    );
}
