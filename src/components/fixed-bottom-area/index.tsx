'use client';

type Props = {
    children: React.ReactNode;
};

export default function CTAButton({ children }: Props) {
    return <div className="fixed bottom-0 left-0 flex w-full justify-center pb-[34px] pt-[16px]">{children}</div>;
}
