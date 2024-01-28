import { Shapes } from '@/components/create-character/constants/create-character-inputs';
import Header from '../header';
import React from 'react';
import Intro from '../intro';
import useCreateCharacter from '../hooks/useCreateCharacter';
import useCarousel from '../hooks/useCarousel';

export default React.memo(function SelectShape() {
    const { setValue } = useCreateCharacter();
    const { handlePrevClick, handleNextClick } = useCarousel();

    const handleClick = (id: number) => {
        setValue('shape', id);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
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
