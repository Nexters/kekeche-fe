export function useLogin(callbackUrl: string) {
    const handleLogin = async () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${callbackUrl}`;
    };
    return handleLogin;
}
