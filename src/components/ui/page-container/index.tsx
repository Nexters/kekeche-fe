import { ReactNode } from 'react'
import TabNavigator from './tab-navigator'

type Props = {
    children: ReactNode
    hasNavigator?: boolean
}

export default function PageContainer({ children, hasNavigator }: Props) {
    return (
        <div className="bg-gray-100">
            <div
                className="mx-auto flex min-h-screen w-full flex-col bg-white shadow-lg md:w-[375px]"
                style={{ minHeight: '100dvh' }}
            >
                <div className="flex flex-1 flex-col overflow-auto">{children}</div>
                {hasNavigator && (
                    <div className="border-top sticky bottom-0 left-0 right-0 z-10 border-t border-t-[#E8EAEE] bg-white">
                        <TabNavigator />
                    </div>
                )}
            </div>
        </div>
    )
}
