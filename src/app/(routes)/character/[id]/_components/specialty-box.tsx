import { PropsWithChildren } from 'react';

export default function SpecialtyBox({ children }: PropsWithChildren) {
    return (
        <div className="h-[48px] w-[296px] rounded-[12px] border border-newGray-200 bg-newGray-100 px-[16px] py-[12px]">
            {children}
        </div>
    );
}
