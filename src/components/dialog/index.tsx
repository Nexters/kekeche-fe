import * as RadixDialog from '@radix-ui/react-dialog';
import { AnimationProps, motion } from 'framer-motion';
import Button from './compounds/button';

export type DialogProps = {
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

function Dialog({ open, onOpenChange, title, description, contents, onConfirm, leftText, rightText }: DialogProps) {
    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <RadixDialog.Portal>
                <RadixDialog.Overlay onKeyUp={(e) => e.preventDefault()}>
                    <RadixDialog.Close className="fixed right-0 top-0 z-[999] h-[100vh] w-full cursor-default">
                        <div
                            className="mx-auto flex min-h-screen  w-auto flex-col items-center justify-center bg-[#0a0a0c4d] shadow-lg lg:w-[400px] "
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
                                    className="flex h-auto w-[296px] flex-col items-center justify-center rounded-[20px] bg-[#ffffff] px-[24px] py-[56px] "
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
                                        <Dialog.Button text={leftText} color="gray" />
                                        <Dialog.Button text={rightText} color="red" onClick={() => alert('clicked')} />
                                    </div>
                                </motion.div>
                            </RadixDialog.Content>
                        </div>
                    </RadixDialog.Close>
                </RadixDialog.Overlay>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
Dialog.Button = Button;
Dialog.Close = RadixDialog.Close;

export default Dialog;
