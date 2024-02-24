import { twMerge } from 'tailwind-merge';
import Text from './text';
import Left from './left';
import Right from './right';
import { ReactElement } from 'react';
import { motion } from 'framer-motion';

type Props = {
    className?: string;
    children: ReactElement<typeof Text | typeof Left | typeof Right>[];
};

export default function TopBar({ children, className }: Props) {
    return (
        <motion.div
            layout
            className={twMerge(' relative left-0 top-0 flex h-[48px] w-full items-center justify-center', className)}
        >
            {children}
        </motion.div>
    );
}

TopBar.Text = Text;
TopBar.Left = Left;
TopBar.Right = Right;
