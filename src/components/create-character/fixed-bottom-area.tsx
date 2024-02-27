type Props = {
    className?: string;
    children?: React.ReactNode;
    style?: Record<string, string>;
} & React.HTMLAttributes<HTMLDivElement>;

export default function FixedBottomArea({ className, children, style }: Props) {
    return (
        <div
            className={`fixed bottom-0 mx-auto flex h-[auto]  w-full min-w-[350px] flex-col items-center items-center pt-[16px] lg:w-[400px] ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
