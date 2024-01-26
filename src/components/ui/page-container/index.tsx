import { ReactNode } from 'react';
import TabNavigator from './tab-navigator';

type Props = {
    children: ReactNode;
    hasNavigator?: boolean;
};

export default function PageContainer({ children, hasNavigator }: Props) {
    return (
        <div className="bg-[#f5f5f5]">
            <div
                className="bg-white mx-auto flex min-h-screen w-full flex-col shadow-lg md:w-[375px] "
                style={{ minHeight: '100dvh' }}
            >
                <div className="flex flex-1 flex-col overflow-auto">{children}</div>
                {hasNavigator && (
                    <div className="border-top bg-white sticky bottom-0 left-0 right-0 z-10 border-t border-t-[#E8EAEE]">
                        <TabNavigator />
                    </div>
                )}
            </div>
        </div>
    );
}
