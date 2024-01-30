import React from 'react';
import Intro from '../intro';
import FixedBottomArea from '../fixed-bottom-area';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';

export default React.memo(function Login() {
    const handleClick = () => {
        //로그인
        // 성공 시 localstorage에서 가져온 캐릭터 데이터 전송
        // 캐릭터 페이지로 리다이렉트
    };
    return (
        <>
            <Intro title="로그인" />
            <FixedBottomArea className="mb-[31px]">
                <KakaoLoginButton callbackUrl={'http://localhost:3000/api/redirect'} />
            </FixedBottomArea>
        </>
    );
});
