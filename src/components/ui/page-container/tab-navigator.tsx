'use client'

import FileMultipleIcon from '@/assets/icons/file-multiple_24x24.svg'
import HomeIcon from '@/assets/icons/home_24x24.svg'
import PencilIcon from '@/assets/icons/pencil_24x24.svg'
import UserProfileIcon from '@/assets/icons/user-profile_24x24.svg'
import Link from 'next/link'

export default function TabNavigator() {
    const Menus = [
        { name: '홈', IconComponent: HomeIcon },
        { name: '작성', IconComponent: PencilIcon },
        { name: '기록', IconComponent: FileMultipleIcon },
        { name: '내 정보', IconComponent: UserProfileIcon },
    ]

    return (
        <nav className="w-full">
            <ul className="relative flex justify-around">
                {Menus.map(({ name, IconComponent }, i) => (
                    <li key={i} className="flex-1 ">
                        <Link href="/" className="flex flex-col items-center justify-center gap-1 pb-3 pt-2">
                            <span className="color-[#AFAFAF]">
                                <IconComponent />
                            </span>
                            <span className="text-[12px] leading-4 text-[#48484e]">{name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
