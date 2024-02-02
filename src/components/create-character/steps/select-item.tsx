import Header from '../header';
import Intro from '../intro';
import React, { useState } from 'react';
import { Items } from '../constants/create-character-inputs';
import useCarousel from '../hooks/useCarousel';
import useCreateCharacter from '../hooks/useCreateCharacter';
import CtaButton from '../cta-button';
import FixedBottomArea from '../fixed-bottom-area';

export default React.memo(function SelectItem() {
    const [selected, setSelected] = useState<null | number>(null);
    const { setValue } = useCreateCharacter();
    const { handleNextClick, handlePrevClick } = useCarousel();

    const handleClick = () => {
        setValue('item', selected);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title={'캐릭터의 능력을 올려줄 \n 아이템을 고르세요 (선택)'} />
            <div className="flex flex-col gap-[16px]">
                {Items.map(({ id, name }) => (
                    <button
                        onClick={() => setSelected(id)}
                        key={id}
                        className={`color-[#17171B] w-[329px] rounded-[12px] rounded-[90px] px-[24px] py-[20px] text-left text-semibold16 ${selected === id ? 'bg-[#8D98E6] text-[#F8F8FB]' : 'bg-[#F8F8FB] text-gray-400'}`}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton text="완료" onClick={handleClick} />
            </FixedBottomArea>
        </>
    );
});
