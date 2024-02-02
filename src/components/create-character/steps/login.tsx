import React from 'react';
import Intro from '../intro';
import FixedBottomArea from '../fixed-bottom-area';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';

export default React.memo(function Login() {
    return (
        <>
            <Intro title="로그인" />
            <FixedBottomArea className="mb-[31px]">
                <KakaoLoginButton callbackUrl={'http://localhost:3000/api/redirect'} />
            </FixedBottomArea>
        </>
    );
});
