import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { BottomTabNavigatorV2 } from './bottom-tab-navigator-v2';

type Props = {
    children: ReactNode;
    bgColor?: string;
    hasNavigator?: boolean;
};

// NOTE: V2는 next/headers를 사용하기 때문에 클라이언트 컴포넌트 내부에서 사용하지 않습니다.
export default function PageContainerV2({ children, hasNavigator, bgColor }: Props) {
    return (
        <div className=" relative bg-[#f5f5f5]">
            <div
                className={twMerge(
                    'mx-auto flex min-h-screen w-auto min-w-[350px] flex-col bg-white lg:w-[400px]',
                    bgColor,
                )}
                style={{ minHeight: '100dvh' }}
            >
                <div className=" relative flex h-full flex-1 flex-col overflow-auto">{children}</div>
                {hasNavigator && <BottomTabNavigatorV2 />}
            </div>
        </div>
    );
}
