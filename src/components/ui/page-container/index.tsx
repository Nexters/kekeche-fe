import { ReactNode } from 'react';
import BottomTabNavigator from './bottom-tab-navigator';
import { twMerge } from 'tailwind-merge';
import WriteMemoContainer from '@/components/create-memo/container';

type Props = {
    children: ReactNode;
    bgColor?: string;
    hasNavigator?: boolean;
};

export default function PageContainer({ children, hasNavigator, bgColor }: Props) {
    return (
        <div className=" relative bg-[#f5f5f5]">
            <div
                className={twMerge(
                    ' mx-auto flex min-h-screen  min-w-[375px] max-w-[400px] flex-col bg-white',
                    bgColor,
                )}
                style={{ minHeight: '100dvh' }}
            >
                <div className=" relative flex h-full flex-1 flex-col overflow-auto">{children}</div>
                {hasNavigator && <BottomTabNavigator />}
            </div>
        </div>
    );
}
