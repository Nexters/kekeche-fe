'use client';

import FileMultipleIcon from '@/assets/icons/file-multiple_24x24.svg';
import HomeIcon from '@/assets/icons/home_24x24.svg';
import PencilIcon from '@/assets/icons/pencil_24x24.svg';
import UserProfileIcon from '@/assets/icons/user-profile_24x24.svg';
import ROUTES from '@/constants/route';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TabNavigator() {
    const fullPathname = usePathname();
    const router = useRouter();
    const [memberId, setMemberId] = useState<undefined | number>(undefined);

    const nickname = fullPathname.split('/')[1];

    const Menus = [
        { label: '홈', IconComponent: HomeIcon, path: `/${memberId ?? nickname}` },
        { label: '작성', IconComponent: PencilIcon, path: `${ROUTES.memoCreate}` },
        { label: '기록', IconComponent: FileMultipleIcon, path: `${ROUTES.memos}` },
        { label: '내 정보', IconComponent: UserProfileIcon, path: `${ROUTES.my}` },
    ] as const;

    console.log(Menus[0].path);

    type LabelType = (typeof Menus)[number]['label'];

    const [currentLocation, setCurrentLocation] = useState<LabelType | undefined>(() => {
        return [...Menus].reverse().find(({ label, path }) => fullPathname.includes(path))?.label;
    });

    const handleLocationChange = (label: LabelType, path: string) => () => {
        setCurrentLocation(label);
        router.push(path);
    };

    useEffect(() => {
        const login = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/member`, {
                headers: {
                    Authorization: `${getCookie('accessToken')}`,
                },
            }).then((res) => res.json());

            console.log(res.data.memberId);

            setMemberId(res.data.memberId);

            return res.data;
        };
        login();
    }, []);

    return (
        <div className="border-top sticky bottom-0 left-0 right-0 z-10 border-t border-t-[#E8EAEE] bg-white">
            <nav className="w-full">
                <ul className="relative flex justify-around">
                    {Menus.map(({ label, IconComponent, path }) => (
                        <button onClick={handleLocationChange(label, path)} key={label} className="flex-1">
                            <div className="flex flex-col items-center justify-center gap-1 pb-3 pt-2">
                                <span>
                                    <IconComponent stroke={currentLocation === label ? '#1b1b1e' : '#afafaf'} />
                                </span>
                                <span
                                    className={`text-[12px] leading-4  ${currentLocation === label ? 'text-[#1b1b1e]' : 'text-[#afafaf]'}`}
                                >
                                    {label}
                                </span>
                            </div>
                        </button>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
