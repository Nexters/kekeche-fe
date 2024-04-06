'use client';

import HomeBg from '@/assets/images/homeBg.jpg';
import CtaButton from '@/components/ui/cta-button';
import { Keywords, NO_ITEM_IDX } from '@/constants/character-info';
import {
    CreateCharacterContext,
    CreateCharacterValues,
    useCreateCharacterContext,
} from '@/context/create-character-provider';
import { sendGTMEvent } from '@next/third-parties/google';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FixedBottomArea from '../fixed-bottom-area';
import useCarousel from '../hooks/useCarousel';
import { twMerge } from 'tailwind-merge';
import CharacterImage from '@/components/character-detail/character-image';
import CharacterExp from '@/components/character-detail/character-exp';
import FanfareLottie from '@/assets/lottie/fanfare_purple.json';
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

export function ShowResult() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const step = searchParams.get('step');

    const { getValues } = useCreateCharacterContext();
    const values = getValues();

    const { colorIdx, shapeIdx, name, keywords, itemIdx } = values;
    const characterImg = `https://kr.object.ncloudstorage.com/kekeche-character/character/${shapeIdx}/0/${colorIdx}.webp`;
    const itemImg =
        itemIdx !== NO_ITEM_IDX ? `https://kr.object.ncloudstorage.com/kekeche-character/item/${itemIdx}.webp` : null;
    const { handleNextClick } = useCarousel();

    const [isCreating, setIsCreating] = useState(true);

    const handleNextBtnClick = async () => {
        try {
            // 캐릭터 생성 api...
            const { id } = await createCharacter(values, `${getCookie('accessToken')}`);
            router.push(`/character/${id}`);
            router.refresh();
            sendGTMEvent({ event: 'createCharacter' });
        } catch (err) {
            // 로그인 안 한 사람->'앗' 페이지
            console.log(err);
            setCookie('create-character', JSON.stringify(values));
            handleNextClick();
        }
    };
    const handleRecreateClick = () => {
        window.location.href = '/create';
        sendGTMEvent({ event: 'clickRecreateCharacter' });
    };

    useEffect(() => {
        setIsCreating(true);
        if (step === '6') {
            setTimeout(() => {
                setIsCreating(false);
            }, 3000);
        }
    }, [step]);

    return (
        <>
            {isCreating ? (
                <div className="mx-auto flex h-[100vh] w-full flex-col items-center">
                    <Image quality={100} alt="배경" src={HomeBg} fill />
                    <div className="z-[50] mb-[40px] mt-[80px] flex h-[80px] w-[329px] items-center justify-center rounded-[16px] bg-white text-bold24 text-[#5B616E]">
                        알에서 깨어나고 있어요!
                    </div>
                    <motion.img
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                            ease: 'linear',
                            duration: 1.7,
                            repeat: Infinity,
                        }}
                        src={'/egg.webp'}
                        alt="알"
                        className="z-[99] mt-[10px]"
                    />
                </div>
            ) : (
                <>
                    <div className="mx-auto flex h-auto min-h-screen w-full flex-col items-center bg-white pb-[200px] gradation-bg">
                        <Lottie
                            isClickToPauseDisabled={true}
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: FanfareLottie,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                },
                            }}
                            height={'auto'}
                            width={'auto'}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                zIndex: 4,
                            }}
                        />
                        <div className={twMerge('z-[3] mt-[20px] flex h-auto w-full flex-col items-center')}>
                            <h3 className="text-H1 text-black">{name}</h3>
                            <ul className="mt-[6px] flex gap-[4px]">
                                {keywords?.map((keywordIdx) => (
                                    <li
                                        className={twMerge(
                                            'rounded-[8px] px-[12px] py-[4px] text-[12px] font-[500]',
                                            Keywords[keywordIdx].colorClassname,
                                        )}
                                        key={keywordIdx}
                                    >
                                        {Keywords[keywordIdx].name}
                                    </li>
                                ))}
                            </ul>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 4 }}
                            >
                                <CharacterImage
                                    itemImage={itemImg as string}
                                    characterImage={characterImg}
                                    hasBubble={true}
                                />
                            </motion.div>
                            <CharacterExp animate={false} currentExp={0} nextExp={12} level={1} />
                        </div>
                        <FixedBottomArea className="z-[5] mb-[31px]">
                            <CtaButton text="다음" onClick={handleNextBtnClick} />
                            <button
                                onClick={handleRecreateClick}
                                className="mt-[12px] text-semibold14 text-primary-500  underline"
                            >
                                캐릭터 다시 만들래요
                            </button>
                        </FixedBottomArea>
                    </div>
                </>
            )}
        </>
    );
}
