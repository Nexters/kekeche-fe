type Props = {
    className?: string;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function FixedBottomArea({ className, children, style, ...props }: Props) {
    return (
        <div
            className={`fixed bottom-0 mx-auto flex h-[auto]  w-full min-w-[350px] flex-col items-center pt-[16px] lg:w-[400px] ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
