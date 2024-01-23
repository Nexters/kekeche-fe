import React, { useContext, useState } from 'react';
import CtaButton from '../cta-button';
import Header from '../header';
import { CarouselDispatchContext } from '..';
import { CreateCharacterDispatchContext } from '@/context/create-character-provider';
import Title from '../title';

export default React.memo(function SetName() {
    const createCharacterDispatch = useContext(CreateCharacterDispatchContext);
    const carouselDispatch = useContext(CarouselDispatchContext);

    const [name, setName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const handleClick = () => {
        createCharacterDispatch?.setValue('name', name);
        carouselDispatch?.handleNextClick();
    };

    return (
        <>
            <Header
                onGoBack={() => {
                    carouselDispatch?.handlePrevClick();
                }}
            />
            <Title text="캐릭터의 이름을 정해 주세요." />
            <p className="text-regular16 mt-[8px] w-[327px] text-left text-[#6B7180]">캐릭터의 이름을 작성해 주세요.</p>
            <input
                className="mt-[24px] h-[48px] w-[312px] rounded-[12px] border border-[#E8EAEE] bg-[#F7F8F9] px-[16px] py-[12px]"
                value={name}
                onChange={handleNameChange}
                placeholder="이름 작성"
            />
            <p className="color-[#17171B] mt-[30px] w-[327px] text-[20px] font-[700]">예시</p>
            <div className="mt-[32px] flex gap-[12px]">
                <div className="text-semibold16 flex h-[64px] w-[157.5px] items-center justify-center rounded-[12px] bg-[#F7F8F9] text-[#171718]">
                    나는야 패피
                </div>
                <div className="text-semibold16 flex h-[64px] w-[157.5px] items-center justify-center rounded-[12px] bg-[#F7F8F9] text-[#171718]">
                    사이드 플젝 인간
                </div>
            </div>
            <CtaButton text="다음" className="mb-[31px]" onClick={handleClick} />
        </>
    );
});
