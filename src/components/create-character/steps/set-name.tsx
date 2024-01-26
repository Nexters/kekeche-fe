import React, { useState } from 'react';
import CtaButton from '../cta-button';
import Header from '../header';
import Intro from '../intro';
import useCarousel from '../hooks/useCarousel';
import useCreateCharacter from '../hooks/useCreateCharacter';

export default React.memo(function SetName() {
    const { setValue } = useCreateCharacter();
    const { handleNextClick, handlePrevClick } = useCarousel();

    const [name, setName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const handleClick = () => {
        // TODO: name 유효성 검증 로직 추가
        setValue('name', name);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title="캐릭터의 이름을 정해 주세요." description="한글, 영문 대소문자. 공백 포함 최대 8자." />
            <input
                className="ml-[24px] h-[48px] w-[312px]  rounded-[12px] border border-[#E8EAEE] bg-[#F7F8F9] px-[16px] py-[12px]"
                value={name}
                onChange={handleNameChange}
                placeholder="이름 작성"
            />
            <p className="color-[#17171B]  ml-[24px] mt-[30px] w-[327px] text-[20px] font-[700]">예시</p>
            <div className="ml-[24px]  mt-[32px] flex gap-[12px]">
                <div className="flex h-[64px] w-[157.5px] items-center justify-center rounded-[12px] bg-[#F7F8F9] text-semibold16 text-[#171718]">
                    나는야 패피
                </div>
                <div className="flex h-[64px] w-[157.5px] items-center justify-center rounded-[12px] bg-[#F7F8F9] text-semibold16 text-[#171718]">
                    사이드 플젝 인간
                </div>
            </div>
            <CtaButton text="다음" className="mb-[31px]" onClick={handleClick} />
        </>
    );
});
