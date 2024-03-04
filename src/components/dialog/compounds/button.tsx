import { cn } from '@/lib/utils-shadcn';
import * as RadixDialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { DialogProps } from '..';

type Props = {
    text: string;
    color: 'gray' | 'red' | 'blue';
    size?: DialogProps['size'];
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ text, color, size = 'medium', ...props }: Props) {
    const sizeVariants = {
        medium: 'w-[118px] h-[48px] rounded-[12px]',
        large: 'w-[144px h-[48px] rounded-[8px]',
    };
    const bgColor: Record<Props['color'], string> = {
        gray: 'bg-[#ECEFF5] text-newGray-600',
        red: 'bg-[#EA2727] text-white',
        blue: 'bg-primary-500 text-white ',
    };

    return (
        <RadixDialog.Close {...props} className="h-[48px] w-full ">
            <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                    'flex h-full w-full items-center justify-center rounded-[8px] bg-newGray-200 text-[16px] font-[600]',
                    bgColor[color],
                    sizeVariants[size],
                )}
            >
                {text}
            </motion.div>
        </RadixDialog.Close>
    );
}
