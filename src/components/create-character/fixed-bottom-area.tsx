type Props = {
    className?: string;
    children?: React.ReactNode;
};

export default function FixedBottomArea({ className, children }: Props) {
    return (
        <div className={`absolute bottom-0 flex h-[auto] w-[375px] flex-col items-center pt-[16px] ${className}`}>
            {children}
        </div>
    );
}
