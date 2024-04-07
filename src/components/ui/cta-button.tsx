'use client';

import { ComponentPropsWithoutRef, ElementType } from 'react';

type ExtendedProps<C extends ElementType = 'button'> = {
    text?: string;
    as?: C;
    children?: React.ReactNode;
};

type Props<C extends ElementType = 'button'> = ExtendedProps<C> &
    Omit<ComponentPropsWithoutRef<C>, keyof ExtendedProps>;

export default function CTAButton<C extends ElementType = 'button'>({ text, as, children, ...props }: Props<C>) {
    const Component = as ?? 'button';
    return (
        <Component
            className={`flex h-[56px] w-[343px] items-center justify-center rounded-[16px] text-[18px] font-[600] text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)]  ${props.disabled ? 'bg-[#7D7D7D] shadow-none active:shadow-none ' : ' bg-primary-500 active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]'}`}
            {...props}
        >
            {text}
            {children}
        </Component>
    );
}
