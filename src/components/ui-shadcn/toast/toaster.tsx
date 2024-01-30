'use client';

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/ui-shadcn/toast/toast';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider duration={2000}>
            {toasts.map(function ({ id, title, description, position, action, ...props }) {
                return (
                    <Toast key={id} {...props} className={position}>
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
