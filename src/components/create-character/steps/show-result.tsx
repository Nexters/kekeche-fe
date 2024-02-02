'use client';
import FlowerIcon from '@/assets/icons/flower_pink_20x20.svg';
import HomeBg from '@/assets/images/homeBg.jpg';
import { CreateCharacterValues, CreateCharacterValuesContext } from '@/context/create-character-provider';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Keywords } from '../constants/create-character-inputs';
import CtaButton from '../cta-button';
import FixedBottomArea from '../fixed-bottom-area';
import Header from '../header';
import useCarousel from '../hooks/useCarousel';

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

    if (createCharacterValues === null) {
        alert('처음부터 하세요.');
        router.push('/');
        throw new Error('');
    }

    const { color, shape, name, keywords, item } = createCharacterValues;
    console.log(item);
    const characterImg = `https://kr.object.ncloudstorage.com/kekeche-character/character/${shape}/0/${color}.png`;
    const itemImg = item !== null ? `https://kr.object.ncloudstorage.com/kekeche-character/item/${item}.png` : null;
    console.log(itemImg);
    const { handleNextClick } = useCarousel();

    const [isCreating, setIsCreating] = useState(true);

    const handleNextBtnClick = async () => {
        try {
            // 캐릭터 생성 api...
            const { id } = await createCharacter(createCharacterValues, `${getCookie('accessToken')}`);

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
                <div className="mx-auto flex h-full w-full flex-col items-center bg-[#F2F3FB]">
                    <Header />
                    <div className="mb-5 mt-[45px] flex w-[87px] items-center justify-center gap-1 rounded-full bg-[#C4CAF7]  px-[14px] py-[6px]">
                        <FlowerIcon fill={'#606FD8'} />
                        <span className="text-bold16 font-bold text-[#606FD8]">Lv.1</span>
                    </div>
                    <div>
                        <div className="relative mb-5 h-[280px] w-[280px] rounded-[20px] bg-[#F7F7FB]">
                            <Image
                                priority
                                width={280}
                                height={280}
                                src={characterImg}
                                alt={'캐릭터 미리보기'}
                                className="absolute left-0 top-0"
                            />
                            {itemImg && (
                                <Image
                                    priority
                                    width={280}
                                    height={280}
                                    src={itemImg}
                                    alt={'아이템 미리보기'}
                                    className="absolute left-0 top-0"
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-4 rounded-2xl p-5">
                        <div className="mb-[10px] flex items-center justify-center gap-2">
                            <p className="text-semibold24 text-gray-600">{name}</p>
                        </div>
                        <div className="flex gap-[6px] text-semibold14 text-gray-300">
                            {keywords?.map((keyword, i) => (
                                <span key={i} className="rounded-full bg-gray-200 px-3 py-1">
                                    {Keywords[keyword].name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="h-[24px]">
                        <div className="flex items-center gap-2">
                            <span className="text-bold16 text-[#8E939E]">0/10</span>
                            <span className="relative h-[18px] w-[210px] flex-1 rounded-full bg-gray-200"></span>
                        </div>
                    </div>
                    <FixedBottomArea className="mb-[31px]">
                        <CtaButton text="다음" onClick={handleNextBtnClick} />
                        <button
                            onClick={handleRecreateClick}
                            className="text-purple-200 mt-[12px] text-semibold14 text-[#7D7D7D] underline"
                        >
                            캐릭터 다시 만들래요
                        </button>
                    </FixedBottomArea>
                </div>
            )}
        </>
    );
}
