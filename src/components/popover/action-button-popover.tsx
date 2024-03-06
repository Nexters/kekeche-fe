'use client';

import MeatballIcon from '@/assets/icons/meatball_20x20.svg';
import * as RadixPopOver from '@radix-ui/react-popover';
import PencilIcon from '@/assets/icons/pencil_24x24.svg';
import TrashIcon from '@/assets/icons/trash_24x24.svg';

export default function ActionButtonPopover({
    onClick: onDelete,
    onEdit,
}: {
    onClick: () => void;
    onEdit: () => void;
}) {
    return (
        <RadixPopOver.Root modal>
            <RadixPopOver.Trigger className="p-3 pr-0">
                <MeatballIcon />
            </RadixPopOver.Trigger>
            <RadixPopOver.Portal>
                <RadixPopOver.Content
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="z-10 mr-[40px] w-fit rounded-[8px] border-none bg-[#fff] p-3 shadow-2xl"
                >
                    <ul>
                        <li>
                            <button onClick={onEdit} className="flex items-center gap-1">
                                <PencilIcon className="fill-[#4B4F58]" />
                                <span className="text-semibold16 text-gray-600">수정</span>
                            </button>
                        </li>
                        <div className="mx-[-12px] my-1 h-[1px] bg-gray-200" />
                        <li>
                            <button onClick={onDelete} className="flex items-center gap-1">
                                <TrashIcon stroke="#F04141" />
                                <span className="text-semibold16 text-[#F04141]">삭제</span>
                            </button>
                        </li>
                    </ul>
                </RadixPopOver.Content>
            </RadixPopOver.Portal>
        </RadixPopOver.Root>
    );
}
