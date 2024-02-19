import { useEffect, useState } from 'react';

export default function useIsIos() {
    const [showInstall, setShowInstall] = useState(false);
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;

    useEffect(() => {
        if (isIos() && !isInStandaloneMode()) {
            setShowInstall(true);
        }
    }, []);

    return { isIos, showInstall };
}
