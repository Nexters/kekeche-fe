'use client';

import BeanIcon from '@/assets/icons/bean_pink.svg';
import MockCharacterImage from '@/assets/images/mock_character_120x120.png';
import { PageContainer } from '@/components/ui';
import getCharacters, { GetCharactersResponse } from '@/services/getCharacters';
import getMember, { GetMemberResponse } from '@/services/getMember';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home({ params: { memberId } }: { params: { memberId: string } }) {
    const [charactersResponse, setCharactersResponse] = useState<GetCharactersResponse | undefined>(undefined);
    const [memberResponse, setMemberResponse] = useState<GetMemberResponse | undefined>(undefined);

    useEffect(() => {
        if (memberId) {
            getCharacters({ memberId: Number(memberId), accessToken: getCookie('accessToken') });
        }
    }, [memberId]);

    useEffect(() => {
        getMember({ accessToken: getCookie('accessToken') });
    });

    return (
        <PageContainer hasNavigator>
            <div className="mb-2 py-5 text-center text-[24px] font-bold leading-8">준근의 도감</div>
            <div className="grid grid-cols-2 gap-3 px-6 py-4">
                {Array(4)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <Link
                                href="/character/1"
                                key={i}
                                className="flex flex-col items-center justify-center rounded-2xl bg-[#FFF3F4] px-4 py-[18px] "
                            >
                                <div className="mb-2 flex items-center rounded-full bg-[#FFC9D0] px-2 py-[6px]">
                                    <span className="h-4 w-4">
                                        <BeanIcon />
                                    </span>
                                    <span className="text-[12px] font-semibold leading-3 text-[#E57897]">Lv.5</span>
                                </div>
                                <div className="mb-1">
                                    <Image priority alt="몰랑이" src={MockCharacterImage} />
                                </div>
                                <p className="mb-1 text-semibold14 text-contentPrimaryLight">넥터 PM</p>
                                <div className="h-[15px] w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="relative h-2 flex-1 rounded-full bg-gray-200">
                                            <span className="inest-0 absolute h-full w-1/3 rounded-full bg-[#E57897]" />
                                        </span>
                                        <span className="text-[10px] font-semibold leading-[15px] text-[#565E71]">
                                            00/10
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                <CharacterCreateButton />
            </div>
        </PageContainer>
    );
}

function CharacterCreateButton() {
    return (
        <Link href="/create" className="grid h-[236px]  place-items-center rounded-xl bg-backgroundSecondaryLight">
            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M56.75 32.1797H32.75V56.1797H24.75V32.1797H0.75V24.1797H24.75V0.179688H32.75V24.1797H56.75V32.1797Z"
                    fill="#DCDCDC"
                />
            </svg>
        </Link>
    );
}
