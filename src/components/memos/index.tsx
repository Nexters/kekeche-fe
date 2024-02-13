import { PropsWithChildren } from 'react';

export default function Memos({ children }: PropsWithChildren) {
    return (
        <section className="mx-auto w-full pb-11">
            <div className="flex w-full flex-col items-center gap-[16px] px-[24px] ">{children}</div>
        </section>
    );
}
