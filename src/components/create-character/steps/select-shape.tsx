import { Shapes } from '@/components/create-character/constants/create-character-inputs';
import Header from '../header';
import React, { useState } from 'react';
import Intro from '../intro';
import useCreateCharacter from '../hooks/useCreateCharacter';
import useCarousel from '../hooks/useCarousel';
import CheckCircle from '@/assets/icons/check-circle.svg';
import CtaButton from '../cta-button';
import FixedBottomArea from '../fixed-bottom-area';
import Image from 'next/image';

export default React.memo(function SelectShape() {
    const [selected, setSelected] = useState<null | number>(null);

    const { setValue } = useCreateCharacter();
    const { handlePrevClick, handleNextClick } = useCarousel();

    const handleSelect = (id: number) => {
        setSelected((prev) => (prev === id ? null : id));
    };

    const handleClick = () => {
        if (selected === null) return;

        setValue('shape', selected);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title="캐릭터의 모습을 고르세요" />
            <div className="flex flex-col gap-[16px]">
                {Shapes.map(({ id, image }) => (
                    <button
                        className={`relative flex h-[129px] w-[279px] items-center justify-center rounded-[16px] bg-[#F7F8F9]`}
                        key={id}
                        onClick={() => handleSelect(id)}
                    >
                        <Image alt="캐릭터" src={image} width={90} height={90} />
                        {selected === id && (
                            <div className="absolute flex h-full w-full items-center justify-center rounded-[16px] bg-[#8D98E6] opacity-50">
                                <CheckCircle />
                            </div>
                        )}
                    </button>
                ))}
            </div>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton disabled={selected === null} text="다음" onClick={handleClick} />
            </FixedBottomArea>
        </>
    );
});
