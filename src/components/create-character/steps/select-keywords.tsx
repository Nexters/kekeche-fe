import { CreateCharacterDispatchContext } from "@/context/create-character-provider";
import { useContext } from "react";
import { CarouselDispatchContext } from "..";
import Header from "../header";
import Intro from "../intro";
import React from "react";
import CtaButton from "../cta-button";


export default React.memo(function SelectKeywords(){

    // const createCharacterDispatch = useContext(CreateCharacterDispatchContext);
    const carouselDispatch = useContext(CarouselDispatchContext);

    return <>
    <Header onGoBack={()=>{carouselDispatch?.handlePrevClick()}} />
    <Intro title="캐릭터의 모습을 고르세요" />
    <CtaButton
                text="시작"
                onClick={() => {
                    carouselDispatch?.handleNextClick();
                }}
                className="mb-[31px]"
            />
    </>;

});