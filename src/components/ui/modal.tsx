import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '../ui-shadcn/dialog';
import { CopyIcon } from 'lucide-react';
import { Button } from '../ui-shadcn/button';

export default function Modal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button>Share</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <label htmlFor="link" className="sr-only">
                            Link
                        </label>
                        <input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <CopyIcon className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
