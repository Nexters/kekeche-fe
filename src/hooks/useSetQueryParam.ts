import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function useSetQueryParam() {
    const pathname = usePathname();
    const router = useRouter();

    const setQueryParam = useCallback(
        (key: string, value: string) => {
            router.replace(pathname + `?${key}=${value}`);
        },
        [router, pathname],
    );

    return setQueryParam;
}
