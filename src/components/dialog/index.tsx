import * as RadixDialog from '@radix-ui/react-dialog';
import { AnimationProps, motion } from 'framer-motion';
import Button from './compounds/button';
import { cn } from '@/lib/utils-shadcn';

export type DialogProps = {
    type?: 'basic' | 'alert';
    size?: 'medium' | 'large';
    open: boolean;
    onOpenChange(open: boolean): void;
    onConfirm?(): void;
    title: string;
    leftText: string;
    rightText: string;
    description?: string;
    contents?: React.ReactNode;
};

const animationProps: AnimationProps = {
    initial: {
        scale: 0.3,
        opacity: 0.5,
    },
    animate: {
        scale: 1,
        opacity: 1,
    },
};

function Dialog({
    open,
    onOpenChange,
    title,
    description,
    contents,
    onConfirm,
    leftText,
    rightText,
    type = 'basic',
    size = 'medium',
}: DialogProps) {
    const sizeVariants = {
        medium: 'w-[296px] px-[24px] py-[56px] rounded-[20px]',
        large: 'w-[328px] px-[16px] pt-[40px] pb-[32px] rounded-[24px]',
    };
    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <RadixDialog.Portal>
                <RadixDialog.Overlay onKeyUp={(e) => e.preventDefault()}>
                    <div className="fixed right-0 top-0 z-[999] h-[100vh] w-full cursor-default">
                        <div
                            className={
                                'mx-auto flex min-h-screen  w-auto flex-col items-center justify-center bg-[#0a0a0c4d] shadow-lg lg:w-[400px] '
                            }
                            style={{ height: '100%' }}
                        >
                            <RadixDialog.Content
                                onOpenAutoFocus={(e) => e.preventDefault()}
                                onCloseAutoFocus={(e) => e.preventDefault()}
                                onKeyDown={(e) => e.stopPropagation()}
                                onEscapeKeyDown={(e) => e.preventDefault()}
                                onClick={(e) => e.stopPropagation()}
                                className="z-[1000]"
                            >
                                <motion.div
                                    {...animationProps}
                                    key="dialog"
                                    className={cn(
                                        'flex h-auto w-[296px] flex-col items-center justify-center rounded-[20px] bg-[#ffffff] px-[24px] py-[56px] ',
                                        sizeVariants[size],
                                    )}
                                >
                                    <div className="flex flex-col items-center gap-[4px]">
                                        {<h2 className="text-[22px] font-[700] text-[#17171B]">{title}</h2>}
                                        {description && (
                                            <h3 className="mt-[4px] whitespace-pre-line text-Subtitle2 text-newGray-800">
                                                {description}
                                            </h3>
                                        )}
                                    </div>
                                    {contents}
                                    <div className=" mt-[20px] flex  w-full gap-[8px]">
                                        <Dialog.Button text={leftText} color="gray" size={size} />
                                        <Dialog.Button
                                            size={size}
                                            text={rightText}
                                            color={type === 'alert' ? 'red' : 'blue'}
                                            onClick={onConfirm}
                                        />
                                    </div>
                                </motion.div>
                            </RadixDialog.Content>
                        </div>
                    </div>
                </RadixDialog.Overlay>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
Dialog.Button = Button;
Dialog.Close = RadixDialog.Close;

export default Dialog;
