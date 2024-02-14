import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    triggerElement?: React.ReactNode;
    title?: string;
    description?: string;
    contents?: React.ReactNode;
    open?: boolean;
    onOpenChange?: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({ open, onOpenChange, triggerElement, title, description, contents }: Props) {
    return (
        <Dialog modal open={open} onOpenChange={onOpenChange}>
            {triggerElement && <DialogTrigger asChild>{triggerElement}</DialogTrigger>}
            <DialogClose>
                <DialogContent>
                    <div className="fixed right-0 top-0 z-[999] h-[100vh] w-full">
                        <div
                            className="mx-auto flex min-h-screen  w-[400px] flex-col items-center justify-center bg-[#0a0a0c4d] shadow-lg "
                            style={{ minHeight: '100dvh' }}
                        >
                            <div
                                className="flex h-auto w-[296px] flex-col items-center justify-center rounded-[20px] bg-[#ffffff] px-[24px] py-[56px] "
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="mb-[20px] flex flex-col items-center gap-[4px]">
                                    {title && <h2 className="text-[#17171B)] text-[20px] font-[700]">{title}</h2>}
                                    {description && <h3 className="text-[#3D4350)] text-regular16">{description}</h3>}
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
