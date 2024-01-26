import { useContext, useEffect, useState } from 'react';
import Intro from '../intro';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import EggImg from '@/assets/images/egg.png';
import Header from '../header';
import { CreateCharacterValuesContext } from '@/context/create-character-provider';
import { Keywords } from '../constants/create-character-inputs';
import CtaButton from '../cta-button';
import useCreateCharacter from '../hooks/useCreateCharacter';
import { useRouter } from 'next/navigation';
import useCarousel from '../hooks/useCarousel';
import FixedBottomArea from '../fixed-bottom-area';

export default function ShowResult() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const step = searchParams.get('step');

    const createCharacterValues = useContext(CreateCharacterValuesContext);

    const { handleNextClick } = useCarousel();

    const [isCreating, setIsCreating] = useState(true);

    console.log(createCharacterValues);

    const handleNextBtnClick = () => {
        // 캐릭터 생성 api...
        // 로그인 안 한 사람->'앗' 페이지
        handleNextClick();
        // 로그인 한 사람 -> 생성된 캐릭터 생세 페이지로 이동
    };
    const handleRecreateClick = () => {
        // 이거 말고 더 좋은 방법 없나?
        window.location.href = '/create';
    };

    useEffect(() => {
        if (step === '6') {
            setTimeout(() => {
                setIsCreating(false);
                //TODO: 4초로 변경하기
            }, 2000);
        }
    }, [step]);

    return (
        <>
            {isCreating ? (
                <>
                    <Intro title={<div className="h-full w-full text-center">캐릭터 생성중</div>} />
                    <div className="mt-[40.75px] flex w-full justify-center">
                        <Image src={EggImg} alt="캐릭터 생성중 이미지" />
                    </div>
                </>
            ) : (
                <>
                    <Header />
                    <div className="flex h-[333px] w-[327px] flex-col gap-[10px] rounded-[20px] bg-[#F5F5F5] px-[24px] py-[32px] text-center">
                        <Image src={EggImg} alt="이미지 추가 예정" width={190.2} height={190.2} />
                        <p className="font-600 whitespace-pre-line text-[28px]">{'사이드 플젝 인간 \n Lv.0'}</p>
                    </div>
                    <div className="ml-[40px] mt-[36px]  flex w-full flex-col gap-[12px] text-start ">
                        <p className="text-semibold18">성격</p>
                        <div className=" flex flex-wrap gap-[12px]">
                            {createCharacterValues?.keywords?.map((id, idx) => (
                                <div
                                    className="flex h-auto w-auto items-center justify-center rounded-[8px] bg-[#F7F8F9] px-[12px] py-[10px] text-semibold10"
                                    key={idx}
                                >
                                    #{Keywords.find((keyword) => keyword.id === id)?.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <FixedBottomArea className="mb-[31px]">
                        <CtaButton text="다음" onClick={handleNextClick} />
                        <button
                            onClick={handleRecreateClick}
                            className="mt-[12px] text-semibold14 text-[#7D7D7D] underline"
                        >
                            캐릭터 다시 만들래요
                        </button>
                    </FixedBottomArea>
                </>
            )}
        </>
    );
}
