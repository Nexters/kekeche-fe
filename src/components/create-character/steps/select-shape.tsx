import CheckCircle from '@/assets/icons/check-circle.svg';
import CtaButton from '@/components/ui/cta-button';
import { Shapes } from '@/constants/character-info';
import Image from 'next/image';
import React, { useState } from 'react';
import FixedBottomArea from '../fixed-bottom-area';
import Header from '../header';
import useCarousel from '../hooks/useCarousel';
import useCreateCharacter from '../hooks/useCreateCharacter';
import Intro from '../intro';

type ShapeId = (typeof Shapes)[number]['id'];

export default React.memo(function SelectShape() {
    const [selected, setSelected] = useState<null | ShapeId>(null);

    const { setValue } = useCreateCharacter();
    const { handlePrevClick, handleNextClick } = useCarousel();

    const handleSelect = (id: ShapeId) => {
        setSelected((prev) => (prev === id ? null : id));
    };

    const handleClick = () => {
        if (selected === null) return;

        setValue('shapeIdx', selected);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title="캐릭터의 모습을 고르세요" />
            <div className="flex flex-col gap-[16px]">
                {Shapes.map(({ id, image }) => (
                    <button
                        className={`relative flex h-[129px] w-[327px] items-center justify-center rounded-[16px] bg-[#F7F8F9]`}
                        key={id}
                        onClick={() => handleSelect(id)}
                    >
                        <Image quality={100} alt="캐릭터" src={image} width={90} height={90} />
                        {selected === id && (
                            <div className="absolute flex h-full w-full items-center justify-center rounded-[16px] bg-primary-500 opacity-50">
                                <CheckCircle />
                            </div>
                        )}
                    </button>
                ))}
            </div>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton shadow={false} disabled={selected === null} text="다음" onClick={handleClick} />
            </FixedBottomArea>
        </>
    );
});
