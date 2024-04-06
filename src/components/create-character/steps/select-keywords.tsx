import Header from '../header';
import Intro from '../intro';
import React, { useState } from 'react';
import CtaButton from '@/components/ui/cta-button';
import useCarousel from '../hooks/useCarousel';
import FixedBottomArea from '../fixed-bottom-area';
import { Keywords } from '@/constants/character-info';
import { useCreateCharacterContext } from '@/context/create-character-provider';

type KeywordId = (typeof Keywords)[number]['id'];

export default React.memo(function SelectKeywords() {
    const { handleNextClick } = useCarousel();

    const { setValue } = useCreateCharacterContext();

    const [selected, setSelected] = useState<Array<KeywordId>>([]);

    const handleClick = (id: KeywordId) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : prev.length < 3
                  ? [...prev, id]
                  : [...prev],
        );
    };

    const handleNextButtonClick = () => {
        if (selected.length === 0) {
            alert('키워드를 한 개 이상 선택해 주세요.');
            return;
        }

        setValue('keywords', selected);
        handleNextClick();
    };

    return (
        <>
            <div className="h-[52px] w-full" />
            <Intro
                title={
                    <span>
                        <span className="text-primary-500">또 다른 나</span>의 성격을 고르세요.
                    </span>
                }
                description="최소 1개, 최대 3개 골라주세요."
            />
            <div className="flex w-[327px] flex-wrap gap-[16px] pb-[100px] ">
                {Keywords.map(({ id, name }) => (
                    <button
                        className={`flex h-auto w-auto items-center justify-center rounded-[8px] rounded-full px-[12px] py-[8px] text-semibold14 ${selected.includes(id) ? 'bg-primary-500 text-[#F6F8FC]' : 'bg-[#ECEFF5] text-[#C6CBD8] '}`}
                        key={id}
                        onClick={() => handleClick(id)}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton disabled={selected.length === 0} text="다음" onClick={handleNextButtonClick} />
            </FixedBottomArea>
        </>
    );
});
