import Header from '../header';
import Intro from '../intro';
import React, { useState } from 'react';
import CtaButton from '../cta-button';
import useCarousel from '../hooks/useCarousel';
import FixedBottomArea from '../fixed-bottom-area';
import useCreateCharacter from '../hooks/useCreateCharacter';
import { Keywords } from '@/constants/character-info';

type KeywordId = (typeof Keywords)[number]['id'];

export default React.memo(function SelectKeywords() {
    const { handlePrevClick, handleNextClick } = useCarousel();

    const { setValue } = useCreateCharacter();

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
            // TODO: 나중에 toast로 바꾸기
            alert('키워드를 한 개 이상 선택해 주세요.');
            return;
        }

        setValue('keywords', selected);
        handleNextClick();
    };

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title="캐릭터의 성격을 고르세요" description="최소 1개, 최대 3개 골라주세요." />
            <div className="flex w-full flex-wrap gap-[16px] px-[26px]">
                {Keywords.map(({ id, name }) => (
                    <button
                        className={`flex h-auto w-auto items-center justify-center rounded-[8px] rounded-full px-[12px] py-[8px] text-semibold14 ${selected.includes(id) ? 'bg-[#8D98E6] text-gray-100' : 'bg-gray-150 text-gray-400 '}`}
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
