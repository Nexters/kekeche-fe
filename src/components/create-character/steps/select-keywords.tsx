import Header from '../header';
import Intro from '../intro';
import React, { useState } from 'react';
import CtaButton from '../cta-button';
import useCarousel from '../hooks/useCarousel';
import FixedBottomArea from '../fixed-bottom-area';
import { Keywords } from '../constants/create-character-inputs';
import useCreateCharacter from '../hooks/useCreateCharacter';

export default React.memo(function SelectKeywords() {
    const { handlePrevClick, handleNextClick } = useCarousel();

    const { setValue } = useCreateCharacter();

    const [selected, setSelected] = useState<Array<number>>([]);

    const handleClick = (id: number) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : prev.length < 3
                  ? [...prev, id]
                  : [...prev],
        );
    };

    const handleNextButtonClick = () => {
        setValue('keywords', selected);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title="캐릭터의 성격을 고르세요" />
            <div className="flex w-full flex-wrap gap-[16px] px-[31px]">
                {Keywords.map(({ id, name }) => (
                    <button
                        className={`flex h-auto w-auto items-center justify-center rounded-[8px] px-[12px] py-[10px] text-semibold10 ${selected.includes(id) ? 'bg-[#7D7D7D] text-[#F7F8F9]' : 'bg-[#F7F8F9] text-gray-600 '}`}
                        key={id}
                        onClick={() => handleClick(id)}
                    >
                        #{name}
                    </button>
                ))}
            </div>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton text="다음" onClick={handleNextButtonClick} />
            </FixedBottomArea>
        </>
    );
});
