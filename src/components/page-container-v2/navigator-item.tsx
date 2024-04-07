'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Member } from '@/services/auth/getMember';
import FileMultipleIcon from '@/assets/icons/file-multiple_24x24.svg';
import HomeIcon from '@/assets/icons/home_24x24.svg';
import PencilIcon from '@/assets/icons/pencil_24x24.svg';
import UserProfileIcon from '@/assets/icons/user-profile_24x24.svg';
import { Menus } from './bottom-tab-navigator-v2';

type Props = {
    menuItem: (typeof Menus)[number];
    memberId: Member['memberId'];
};

const IconsMap = {
    홈: HomeIcon,
    작성: PencilIcon,
    기록: FileMultipleIcon,
    '내 정보': UserProfileIcon,
};

export function NavigatorItem({ menuItem: { path, label }, memberId }: Props) {
    const pathname = usePathname();
    const isCurrentLocation = pathname.includes(path);

    const href = path === 'member/' ? `${path}${memberId}` : path;
    const IconComponent = IconsMap[label];

    return (
        <>
            <Link href={href} className="h-full w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-1 pb-3 pt-2">
                    <span>
                        <IconComponent className={isCurrentLocation ? 'fill-primary-500' : 'fill-newGray-400'} />
                    </span>
                    <span
                        className={`text-[12px] leading-4  ${isCurrentLocation ? 'text-primary-500' : 'text-newGray-400'}`}
                    >
                        {label}
                    </span>
                </div>
            </Link>
        </>
    );
}
