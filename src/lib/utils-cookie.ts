import { cookies } from 'next/headers';

import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';

const ACCESS_TOKEN = 'accessToken';

class CookieManager {
    /**
     * only use in route handlers, middleware and RSC
     */
    static getServerAccessToken() {
        const serverCookie = cookies();
        return serverCookie.get(ACCESS_TOKEN)?.value;
    }

    static getAccessToken() {
        return getCookie(ACCESS_TOKEN) ? `${getCookie(ACCESS_TOKEN)}` : undefined;
    }

    static hasAccessToken() {
        return hasCookie(ACCESS_TOKEN);
    }

    static deleteAccessToken() {
        deleteCookie(ACCESS_TOKEN);
    }

    static setClientAccessToken(value: Parameters<typeof setCookie>[1], options: Parameters<typeof setCookie>[2]) {
        setCookie(ACCESS_TOKEN, value, options);
    }

    static setTestAccessToken() {
        setCookie(ACCESS_TOKEN, process.env.TEST_ACCESS_TOKEN, { maxAge: 1000000, httpOnly: false });
    }
}

export default CookieManager;
