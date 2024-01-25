import { useContext } from 'react';
import { CreateCharacterDispatchContext } from '@/context/create-character-provider';
import { Shapes } from '@/components/create-character/constants/create-character-inputs';
import { CarouselDispatchContext } from '..';
import { useRouter } from 'next/navigation';
import Header from '../header';
import React from 'react';
import Intro from '../intro';

export default React.memo(function SelectShape() {
    const router = useRouter();

    const characterDispatch = useContext(CreateCharacterDispatchContext);
    const carouselDispatch = useContext(CarouselDispatchContext);

    const handleClick = (id: number) => {
        characterDispatch?.setValue('shape', id);
        carouselDispatch?.handleNextClick();
    };

    return (
        <>
            <Header onGoBack={() => {carouselDispatch?.handlePrevClick()}} />
            <Intro title="캐릭터의 모습을 고르세요" />
            <div className="flex flex-col gap-[16px]">
                {Shapes.map(({ id, icon: Icon }) => (
                    <button
                          className="flex h-[129px] w-[279px] items-center justify-center rounded-[16px] bg-[#F7F8F9]"
                        key={id}
                        onClick={() => handleClick(id)}
                    >
                        <Icon />
                    </button>
                ))}
            </div>
        </>
    );
});
