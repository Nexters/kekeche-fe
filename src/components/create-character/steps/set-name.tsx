import React, { useRef, useState } from 'react';
import CtaButton from '@/components/ui/cta-button';
import Intro from '../intro';
import useCarousel from '../hooks/useCarousel';
import useCreateCharacter from '../hooks/useCreateCharacter';
import FixedBottomArea from '../fixed-bottom-area';
import { useCreateCharacterContext } from '@/context/create-character-provider';

const NAME_REGEX = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z\s]{1,8}$/;

export default React.memo(function SetName() {
    console.log('name rerender');
    const { setValue } = useCreateCharacterContext();
    const { handleNextClick } = useCarousel();
    const nameRef = useRef<HTMLInputElement | null>(null);

    const [isError, setIsError] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const handleNameChange = () => {
        if (nameRef.current === null) {
            return;
        }
        setIsDirty(true);
        const isValid = NAME_REGEX.test(nameRef.current.value.trim());
        setIsError(!isValid);
    };

    const handleClick = () => {
        if (nameRef.current === null) {
            return;
        }

        if (nameRef.current.value.length === 0) return;

        setValue('name', nameRef.current.value);
        handleNextClick();
    };

    return (
        <>
            <div className="h-[52px] w-full" />
            <Intro
                title={
                    <span>
                        {'내 안에 또 다른 나를 꺼낼 시간!\n'} <span className="text-primary-500">또 다른 나</span>의
                        이름을 지어주세요.
                    </span>
                }
                description="한글, 영문 대소문자. 공백 포함 최대 8자로."
            />
            <div className="flex w-[375px] flex-col gap-[8px] pl-[24px]">
                <input
                    className={`h-[48px] w-[312px]  rounded-[12px] border bg-[#F7F8F9] px-[16px] py-[12px] outline-none ${isError ? 'border-2 border-[#F68277]' : 'border border-[#E8EAEE]'}`}
                    ref={nameRef}
                    onChange={handleNameChange}
                    placeholder="이름 작성"
                />
                <p className="ml-[2px] h-[15px] text-regular14 text-[#CF3644]">
                    {isError && '올바른 이름 형식이 아니에요.'}
                </p>
            </div>
            <p className=" color-[#17171B] mt-[30px]  w-[375px] pl-[24px] text-[20px] font-[700]">예시</p>
            <p className="mt-[12px] w-[375px]  pl-[24px] text-regular16 text-gray-500">
                {'슈퍼디자이너, 맛집덕후, 헬스쪼렙, 착한 효녀'}
            </p>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton disabled={isError || !isDirty} text="다음" onClick={handleClick} />
            </FixedBottomArea>
        </>
    );
});
