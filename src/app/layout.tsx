import QueryClientContext from '@/context/QueryClientContext'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#ffffff',
}

export const metadata: Metadata = {
    applicationName: '캐릭캐릭 다이어리',
    title: '캐릭캐릭 다이어리',
    description: '나만의 작은 세계를 펼치는 특별한 일기',
    manifest: '/manifest.json',
    icons: [
        { rel: 'apple-touch-icon', url: '/icons/icon-128x128.png' },
        { rel: 'icon', url: '/icons/icon-128x128.png' },
    ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <head>
                <link
                    href="splashscreens/iphone5_splash.png"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/iphone6_splash.png"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/iphoneplus_splash.png"
                    media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/iphonex_splash.png"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/iphonexr_splash.png"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/iphonexsmax_splash.png"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/ipad_splash.png"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/ipadpro1_splash.png"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/ipadpro3_splash.png"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="splashscreens/ipadpro2_splash.png"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
            </head>
            <body className={inter.className}>
                <QueryClientContext>
                    <div
                        className="min-h-screen outline outline-1 outline-blue-500 md:w-[375px] flex flex-col mx-auto"
                        style={{ minHeight: '100dvh' }}
                    >
                        {children}
                    </div>
                </QueryClientContext>
            </body>
        </html>
    )
}
