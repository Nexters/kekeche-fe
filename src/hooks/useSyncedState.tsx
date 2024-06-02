import { useServerInsertedHTML } from 'next/navigation';
import { useSyncExternalStore, useCallback, useState } from 'react';

const SYNC_STORAGE_KEY = '__SYNC_STORAGE__';

declare global {
    interface Window {
        __SYNC_STORAGE__: Record<string, string>;
    }
}

export function useSyncedState<T>(callback: () => T, key: string) {
    const isServer = typeof window === 'undefined';

    const value = useSyncExternalStore(
        () => () => {},
        useCallback(() => {
            return Object.hasOwn(window, SYNC_STORAGE_KEY) ? (window.__SYNC_STORAGE__[key] as T) : callback();
        }, [callback, key]),
        () => {
            return isServer || !Object.hasOwn(window, SYNC_STORAGE_KEY)
                ? callback()
                : (window.__SYNC_STORAGE__[key] as T);
        },
    );

    useServerInsertedHTML(() => {
        return (
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                if (Object.hasOwn(window, '${SYNC_STORAGE_KEY}')) {
                    window.${SYNC_STORAGE_KEY}.${key} =  ${JSON.stringify(value)};
                } else {
                    window.${SYNC_STORAGE_KEY} = { ${key}: ${JSON.stringify(value)} };
                }
            `,
                }}
            />
        );
    });

    return useState<T>(value);
}
