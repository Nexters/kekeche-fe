import React, { useContext } from 'react';
import { CarouselDispatchContext } from '..';
import Header from '../header';
import Intro from '../intro';
import { Colors } from '../constants/create-character-inputs';
import { CreateCharacterDispatchContext } from '@/context/create-character-provider';

export default React.memo(function SelectColor() {
    const createCharacterDispatch = useContext(CreateCharacterDispatchContext);
    const carouselDispatch = useContext(CarouselDispatchContext);

    const handleClick = (id: number) => {
        createCharacterDispatch?.setValue('color', id);
        carouselDispatch?.handleNextClick();
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
                        className={`${hexClassName} h-[72px] w-[156px] rounded-[12px]`}
                        onClick={() => handleClick(id)}
                    />
                ))}
            </div>
        </>
    );
});
