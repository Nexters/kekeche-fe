'use client';

type Props = {
    contents: React.ReactNode;
};

export default function FixedBottomArea({ contents }: Props) {
    return <div className="fixed bottom-0 left-0 flex w-full justify-center pb-[34px] pt-[16px]">{contents}</div>;
}
