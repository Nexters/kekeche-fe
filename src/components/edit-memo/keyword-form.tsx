'use client';

import getCharacterSpecialty from '@/services/character/getCharacterSpecialty';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useContext } from 'react';
import { CreateMemoContext } from './create-memo-context';

export default function KeywordForm() {
    const context = useContext(CreateMemoContext);

    const { data } = useQuery({
        queryKey: ['specialty', context?.selectedCharacterId],
        enabled: !!context?.selectedCharacterId,
        queryFn: () =>
            getCharacterSpecialty({
                accessToken: getCookie('accessToken'),
                characterId: Number(context?.selectedCharacterId),
            }),
    });

    return (
        <div>
            <div className="flex gap-1 px-6 py-3">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.58301 17.3853C14.6541 21.6279 20.3109 15.971 19.6038 5.36449C8.99743 4.65737 3.34082 10.3144 7.58301 17.3853ZM7.58301 17.3853C7.58293 17.3851 7.58309 17.3854 7.58301 17.3853ZM7.58301 17.3853L5.75391 19.2137M7.58301 17.3853L11.4108 13.5569"
                        stroke="#8B92A0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="text-semibold14 text-[#8B92A0]">주특기</span>
            </div>
            {data?.specialties && data?.specialties.length > 0 ? (
                <div className="flex flex-wrap gap-2 px-6">
                    {data.specialties.map((item) => (
                        <button
                            onClick={() => {
                                context?.toggleKeyword(item.id);
                            }}
                            key={item.id}
                            className={`rounded-full px-3 py-[6px] text-[12px] font-semibold leading-[18px] text-white transition-colors ${context?.keywords?.includes(item.id) ? 'bg-[#2777EA]' : 'bg-[#c6cbd8]'}`}
                        >
                            {item.content}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="mx-6 rounded-[12px] bg-[#f6f8fc] p-4">
                    <p className="text-semibold14 text-[#aeb5c5]">아직 생성된 주특기가 하나도 없어요!</p>
                </div>
            )}
        </div>
    );
}
