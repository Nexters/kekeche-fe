import Header from '../header';
import Intro from '../intro';
import React, { useState } from 'react';
import useCarousel from '../hooks/useCarousel';
import useCreateCharacter from '../hooks/useCreateCharacter';
import FixedBottomArea from '../fixed-bottom-area';
import { Items, NO_ITEM_IDX } from '@/constants/character-info';
import CtaButton from '@/components/ui/cta-button';

type ItemId = (typeof Items)[number]['id'];

export default React.memo(function SelectItem() {
    const [selected, setSelected] = useState<null | ItemId>(null);
    const { setValue } = useCreateCharacter();
    const { handleNextClick, handlePrevClick } = useCarousel();

    const handleClick = () => {
        setValue('itemIdx', selected === null ? NO_ITEM_IDX : selected);
        handleNextClick();
    };

    const handleSelect = (id: ItemId) => {
        setSelected((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title={'(선택) 캐릭터의 능력을 올려줄 \n 아이템을 고르세요 '} />
            <div className="flex flex-col gap-[16px]">
                {Items.map(({ id, name }) => (
                    <button
                        onClick={() => handleSelect(id)}
                        key={id}
                        className={`w-[329px] rounded-[16px] px-[24px] py-[20px] text-left text-[16px] font-[500] ${selected === id ? 'bg-primary-500 text-white' : 'bg-[#ECEFF5] text-[#707683]'}`}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton shadow={false} text="완료" onClick={handleClick} />
            </FixedBottomArea>
        </>
    );
});
