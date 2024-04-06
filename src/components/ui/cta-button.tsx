'use client';

import Link from 'next/link';

type BaseProps = {
    text?: string;
    children?: React.ReactNode;
};

type LinkProps = {
    as?: 'Link';
    href: string;
    disabled?: boolean;
} & BaseProps;

type ButtonProps = {
    as?: 'button';
} & BaseProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = LinkProps | ButtonProps;

const isLink = (props: Props): props is LinkProps => {
    return props.as === 'Link';
};

export default function CTAButton(props: Props) {
    return (
        <>
            {isLink(props) ? (
                <Link
                    className={`flex h-[56px] w-[343px] items-center justify-center rounded-[16px] text-[18px] font-[600] text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)]  ${props.disabled ? 'bg-[#7D7D7D] shadow-none active:shadow-none ' : ' bg-primary-500 active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]'}`}
                    href={props.href}
                >
                    {props.text}
                </Link>
            ) : (
                <button
                    {...props}
                    className={`h-[56px] w-[343px] rounded-[16px] text-[18px] font-[600] text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)]  ${props.disabled ? 'bg-[#7D7D7D] shadow-none active:shadow-none ' : ' bg-primary-500 active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]'}`}
                >
                    {props.text}
                    {props.children}
                </button>
            )}
        </>
    );
}
