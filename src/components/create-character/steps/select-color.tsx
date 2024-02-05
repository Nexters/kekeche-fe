import React, { useContext, useState } from 'react';
import { CarouselDispatchContext } from '..';
import Header from '../header';
import Intro from '../intro';
import { CreateCharacterDispatchContext } from '@/context/create-character-provider';
import CtaButton from '../cta-button';
import CheckCircle from '@/assets/icons/check-circle.svg';
import FixedBottomArea from '../fixed-bottom-area';
import { Colors } from '@/constants/character-info';

type ColorId = (typeof Colors)[number]['id'];

export default React.memo(function SelectColor() {
    const [selected, setSelected] = useState<null | ColorId>(null);
    const createCharacterDispatch = useContext(CreateCharacterDispatchContext);
    const carouselDispatch = useContext(CarouselDispatchContext);

    const handleClick = () => {
        if (selected === null) return;

        createCharacterDispatch?.setValue('color', selected);
        carouselDispatch?.handleNextClick();
    };

    const handleSelect = (id: ColorId) => {
        setSelected((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <Header
                onGoBack={() => {
                    carouselDispatch?.handlePrevClick();
                }}
            />
            <Intro title="캐릭터의 컬러를 고르세요" />
            <div className="grid grid-cols-2 gap-[16px]">
                {Colors.map(({ id, hexClassName }) => (
                    <button
                        key={id}
                        className={`${hexClassName} relative h-[72px] w-[156px] rounded-[12px]`}
                        onClick={() => handleSelect(id)}
                    >
                        {selected === id && (
                            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-[12px] bg-[#8D98E6] opacity-50">
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
