import { cn } from '@/lib/utils-shadcn';
import * as RadixDialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';

type Props = {
    text: string;
    color: 'gray' | 'red' | 'blue';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ text, color, ...props }: Props) {
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
                )}
            >
                {text}
            </motion.div>
        </RadixDialog.Close>
    );
}
