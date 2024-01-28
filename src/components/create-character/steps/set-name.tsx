import React, { useState } from 'react';
import CtaButton from '../cta-button';
import Header from '../header';
import Intro from '../intro';
import useCarousel from '../hooks/useCarousel';
import useCreateCharacter from '../hooks/useCreateCharacter';
import FixedBottomArea from '../fixed-bottom-area';

export default React.memo(function SetName() {
    const { setValue } = useCreateCharacter();
    const NAME_REGEX = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z\s]{1,8}$/;
    const { handleNextClick, handlePrevClick } = useCarousel();

    const [name, setName] = useState('');
    const [isError, setIsError] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isValid = NAME_REGEX.test(e.currentTarget.value);
        setIsError(!isValid);
        setName(e.currentTarget.value);
    };

    const handleClick = () => {
        setValue('name', name);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro
                title="캐릭터의 이름을 정해 주세요."
                description="한글, 영문 대소문자. 공백 포함 최대 8자로 해주세요."
            />
            <div className="flex flex-col gap-[8px]">
                <input
                    className={`h-[48px] w-[312px]  rounded-[12px] border bg-[#F7F8F9] px-[16px] py-[12px] outline-none ${isError ? 'border-2 border-[#F68277]' : 'border border-[#E8EAEE]'}`}
                    value={name}
                    onChange={handleNameChange}
                    placeholder="이름 작성"
                />
                <p className="ml-[2px] text-regular14 text-[#CF3644]">{isError && '올바른 이름 형식이 아니에요.'}</p>
            </div>
            <p className="color-[#17171B]  ml-[24px] mt-[30px] w-[327px] text-[20px] font-[700]">예시</p>
            <div className="mt-[32px] flex justify-center gap-[12px]">
                <div className="flex h-[64px] w-[157.5px] items-center justify-center rounded-[12px] bg-[#F7F8F9] text-semibold16 text-[#171718]">
                    나는야 패피
                </div>
                <div className="flex h-[64px] w-[157.5px] items-center justify-center rounded-[12px] bg-[#F7F8F9] text-semibold16 text-[#171718]">
                    사이드 플젝 인간
                </div>
            </div>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton disabled={isError} text="다음" onClick={handleClick} />
            </FixedBottomArea>
        </>
    );
});
