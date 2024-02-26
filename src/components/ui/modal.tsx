import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

export type ModalProps = {
    triggerElement?: React.ReactNode;
    title?: string;
    description?: string;
    contents?: React.ReactNode;
    open?: boolean;
    onOpenChange?: Dispatch<SetStateAction<boolean>>;
    className?: string;
};

export default function Modal({
    open,
    onOpenChange,
    triggerElement,
    className,
    title,
    description,
    contents,
}: ModalProps) {
    if (open) {
        window.document.body.style.overflow = 'hidden';
    } else {
        window.document.body.style.overflow = 'auto';
    }
    return (
        <Dialog modal open={open} onOpenChange={onOpenChange}>
            {triggerElement && <DialogTrigger asChild>{triggerElement}</DialogTrigger>}
            <DialogClose onKeyUp={(e) => e.preventDefault()}>
                <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    onKeyDown={(e) => e.stopPropagation()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <div className="fixed right-0 top-0 z-[999] h-[100vh] w-full">
                        <div
                            className="mx-auto flex min-h-screen  w-auto flex-col items-center justify-center bg-[#0a0a0c4d] shadow-lg lg:w-[400px] "
                            style={{ minHeight: '100dvh' }}
                        >
                            <div
                                className={twMerge(
                                    'flex h-auto w-[296px] flex-col items-center justify-center rounded-[20px] bg-[#ffffff] px-[24px] py-[56px] ',
                                    className,
                                )}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="mb-[20px] flex flex-col items-center gap-[4px]">
                                    {title && <h2 className="text-[#17171B)] text-[20px] font-[700]">{title}</h2>}
                                    {description && (
                                        <h3 className="whitespace-pre-line text-Subtitle2 text-newGray-800">
                                            {description}
                                        </h3>
                                    )}
                                </div>
                                {contents}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </DialogClose>
        </Dialog>
    );
}
