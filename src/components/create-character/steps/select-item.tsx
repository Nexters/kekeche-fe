import Header from '../header';
import Intro from '../intro';
import React from 'react';
import { Items } from '../constants/create-character-inputs';
import useCarousel from '../hooks/useCarousel';
import useCreateCharacter from '../hooks/useCreateCharacter';

export default React.memo(function SelectItem() {
    const { setValue } = useCreateCharacter();
    const { handleNextClick, handlePrevClick } = useCarousel();

    const handleClick = (id: number) => {
        setValue('item', id);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title="캐릭터의 아이템을 고르세요" />
            <div className="flex flex-col gap-[16px]">
                {Items.map(({ id, name }) => (
                    <button
                        onClick={() => handleClick(id)}
                        key={id}
                        className="color-[#17171B] w-[329px] rounded-[12px] bg-[#F7F8F9] px-[24px] py-[20px] text-left text-semibold16"
                    >
                        {name}
                    </button>
                ))}
            </div>
        </>
    );
});
