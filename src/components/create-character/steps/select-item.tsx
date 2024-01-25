import { CreateCharacterDispatchContext } from "@/context/create-character-provider";
import { useContext } from "react";
import { CarouselDispatchContext } from "..";
import Header from "../header";
import Intro from "../intro";
import React from "react";
import CtaButton from "../cta-button";


export default React.memo(function SelectItem(){

    // const createCharacterDispatch = useContext(CreateCharacterDispatchContext);
    const carouselDispatch = useContext(CarouselDispatchContext);

    return <>
    <Header onGoBack={()=>{carouselDispatch?.handlePrevClick()}} />
    <Intro title="캐릭터의 아이템을 고르세요" />
    <CtaButton
                text="완료"
                onClick={() => {
                    carouselDispatch?.handleNextClick();
                }}
                className="mb-[31px]"
            />
    </>;

});