import { ReactNode } from 'react';
import BottomTabNavigator from './bottom-tab-navigator';

type Props = {
    children: ReactNode;
    hasNavigator?: boolean;
};

export default function PageContainer({ children, hasNavigator }: Props) {
    return (
        <div className="bg-[#f5f5f5]">
            <div
                className="mx-auto flex min-h-screen min-w-[375px] max-w-[400px]  flex-col bg-white shadow-lg "
                style={{ minHeight: '100dvh' }}
            >
                <div className="flex flex-1 flex-col overflow-auto">{children}</div>
                {hasNavigator && <BottomTabNavigator />}
            </div>
        </div>
    );
}
