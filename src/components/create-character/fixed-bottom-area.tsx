type Props = {
    className?: string;
    children?: React.ReactNode;
    style?: Record<string, string>;
} & React.HTMLAttributes<HTMLDivElement>;

export default function FixedBottomArea({ className, children, style }: Props) {
    return (
        <div
            className={`fixed bottom-0 flex h-[auto] w-full flex-col items-center pt-[16px] ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
