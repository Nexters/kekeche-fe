import React, { useState } from 'react';
import CtaButton from '@/components/ui/cta-button';
import Intro from '../intro';
import useCarousel from '../hooks/useCarousel';
import useCreateCharacter from '../hooks/useCreateCharacter';
import FixedBottomArea from '../fixed-bottom-area';
import { useRouter } from 'next/navigation';

const NAME_REGEX = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z\s]{1,8}$/;

export default React.memo(function SetName() {
    const { setValue } = useCreateCharacter();
    const { handleNextClick } = useCarousel();

    const [name, setName] = useState('');
    const [isError, setIsError] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isValid = NAME_REGEX.test(e.currentTarget.value.trim());
        setIsError(!isValid);
        setName(e.currentTarget.value.trimStart());
    };

    const handleClick = () => {
        if (name.length === 0) return;

        setValue('name', name);
        handleNextClick();
    };

    return (
        <>
            <div className="h-[52px] w-full" />
            <Intro title="캐릭터의 이름을 정해 주세요." description="한글, 영문 대소문자. 공백 포함 최대 8자로." />
            <div className="flex w-[375px] flex-col gap-[8px] pl-[24px]">
                <input
                    className={`h-[48px] w-[312px]  rounded-[12px] border bg-[#F7F8F9] px-[16px] py-[12px] outline-none ${isError ? 'border-2 border-[#F68277]' : 'border border-[#E8EAEE]'}`}
                    value={name}
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
                <CtaButton disabled={isError || name.length === 0} text="다음" onClick={handleClick} />
            </FixedBottomArea>
        </>
    );
});
