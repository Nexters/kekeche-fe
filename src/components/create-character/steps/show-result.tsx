'use client';
import HomeBg from '@/assets/images/homeBg.jpg';
import CharacterDetail from '@/components/character-detail';
import CtaButton from '@/components/ui/cta-button';
import { NO_ITEM_IDX } from '@/constants/character-info';
import { CreateCharacterValues, CreateCharacterValuesContext } from '@/context/create-character-provider';
import { Character } from '@/types/character';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import FixedBottomArea from '../fixed-bottom-area';
import useCarousel from '../hooks/useCarousel';
import LoadingLottie from '@/assets/lottie/create-character-loading.json';
import Lottie from 'react-lottie';

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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadingLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    if (createCharacterValues === null) {
        alert('처음부터 하세요.');
        router.push('/');
        throw new Error('');
    }

    const { colorIdx, shapeIdx, name, keywords, itemIdx } = createCharacterValues;
    const characterImg = `https://kr.object.ncloudstorage.com/kekeche-character/character/${shapeIdx}/0/${colorIdx}.webp`;
    const itemImg =
        itemIdx !== NO_ITEM_IDX ? `https://kr.object.ncloudstorage.com/kekeche-character/item/${itemIdx}.webp` : null;
    const { handleNextClick } = useCarousel();

    const [isCreating, setIsCreating] = useState(true);

    const previewCharacter: Character = {
        id: 0,
        name: name as string,
        characterImage: characterImg,
        itemImage: itemImg as string,
        currentExp: 0,
        nextExp: 12,
        keywords: keywords as number[],
        level: 1,
        totalExp: 0,
    };

    const handleNextBtnClick = async () => {
        try {
            // 캐릭터 생성 api...
            const { id } = await createCharacter(createCharacterValues, `${getCookie('accessToken')}`);
            router.push(`/character/${id}`);
            router.refresh();
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
                    <Image quality={100} alt="배경" src={HomeBg} fill className="opacity-50" />
                    <div className="text-gray-700 h z-[50] mb-[40px] mt-[180px] w-full text-center text-bold24">
                        캐릭터 생성 중
                    </div>
                    <div>
                        <Lottie options={defaultOptions} height={400} width={400} />
                    </div>
                </>
            ) : (
                <div className="mx-auto mt-[56px] flex h-full w-full flex-col items-center bg-white">
                    <CharacterDetail character={previewCharacter} />
                    <FixedBottomArea className="mb-[31px]">
                        <CtaButton shadow={false} text="다음" onClick={handleNextBtnClick} />
                        <button
                            onClick={handleRecreateClick}
                            className="mt-[12px] text-semibold14 text-[#7D7D7D] text-purple-200 underline"
                        >
                            캐릭터 다시 만들래요
                        </button>
                    </FixedBottomArea>
                </div>
            )}
        </>
    );
}
