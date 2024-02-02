'use client';
import { useContext, useEffect, useState } from 'react';
import HomeBg from '@/assets/images/homeBg.jpg';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import EggImg from '@/assets/images/egg.png';
import Header from '../header';
import { CreateCharacterValues, CreateCharacterValuesContext } from '@/context/create-character-provider';
import { Keywords } from '../constants/create-character-inputs';
import CtaButton from '../cta-button';
import { useRouter } from 'next/navigation';
import useCarousel from '../hooks/useCarousel';
import FixedBottomArea from '../fixed-bottom-area';
import { setCookie, getCookie } from 'cookies-next';

export const createCharacter = async (createCharacterValues: CreateCharacterValues, accessToken: string) =>
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character`, {
        method: 'POST',
        body: JSON.stringify(createCharacterValues),
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        },
    })
        .then((res) => res.json())
        .then((body) => body.data);

export default function ShowResult() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const step = searchParams.get('step');

    const createCharacterValues = useContext(CreateCharacterValuesContext);

    const { handleNextClick } = useCarousel();

    const [isCreating, setIsCreating] = useState(true);

    const handleNextBtnClick = async () => {
        if (createCharacterValues === null) {
            alert('처음부터 하세요.');
            router.push('/');
            return;
        }
        try {
            // 캐릭터 생성 api...
            const { id } = await createCharacter(createCharacterValues, `${getCookie('accessToken')}`);
            console.log('here');
            console.log(id);
            router.push(`/character/${id}`);
        } catch (err) {
            // 로그인 안 한 사람->'앗' 페이지
            console.log(err);
            setCookie('create-character', JSON.stringify(createCharacterValues));
            handleNextClick();
        }
    };
    const handleRecreateClick = () => {
        window.location.href = '/create';
    };

    useEffect(() => {
        if (step === '6') {
            setTimeout(() => {
                setIsCreating(false);
                //TODO: 4초로 변경하기
            }, 3000);
        }
    }, [step]);

    return (
        <>
            {isCreating ? (
                <>
                    <Image alt="배경" src={HomeBg} fill className="opacity-50" />
                    <div className="text-gray-700 z-[50] mt-[180px] h-full w-full text-center text-bold24">
                        캐릭터 생성 중
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
                        <CtaButton text="다음" onClick={handleNextBtnClick} />
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
