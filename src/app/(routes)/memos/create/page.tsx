'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import { PageContainer } from '@/components/ui';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui-shadcn/select';
import createMemo from '@/services/createMemo';
import getCharacters, { GetCharactersResponse } from '@/services/getCharacters';
import getMember, { GetMemberResponse } from '@/services/getMember';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function MemoCreate() {
    const [textareaValue, setTextareaValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [charactersResponse, setCharactersResponse] = useState<GetCharactersResponse | undefined>(undefined);
    const [memberResponse, setMemberResponse] = useState<GetMemberResponse | undefined>(undefined);
    const [selectedCharacter, setSelectedCharacter] = useState('');

    const regex = /#(\S+)(?=\s|\p{P}|$)/gu; // \S는 공백이 아닌 문자, \p{P}는 구두점을 나타냅니다.
    const matches = [...textareaValue.matchAll(regex)];
    const hashtags = matches.map((match) => match[0]).map((text) => text.replace('&nbsp;', ''));

    const router = useRouter();

    const replacedText = textareaValue.replace(regex, '<span style="text-decoration:underline;">$&</span>');

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    useEffect(() => {
        getMember({ accessToken: getCookie('accessToken') }).then((res) => setMemberResponse(res));
    }, []);

    useEffect(() => {
        if (memberResponse?.memberId) {
            getCharacters({ memberId: Number(memberResponse.memberId), accessToken: getCookie('accessToken') }).then(
                (res) => setCharactersResponse(res),
            );
        }
    }, [memberResponse?.memberId]);

    return (
        <PageContainer>
            <header className="mb-[10px] flex justify-between gap-2">
                <button
                    onClick={() => {
                        router.back();
                    }}
                    aria-label="뒤로 가기 버튼"
                    className="p-3"
                >
                    <BackArrowIcon stroke="#8E939E" />
                </button>
                <span className=" grid flex-1 place-items-center text-center text-[18px] font-semibold leading-7 text-gray-500">
                    기록 작성
                </span>
                <button
                    onClick={() => {
                        createMemo({
                            accessToken: `${getCookie('accessToken')}`,
                            content: replacedText,
                            characterId: Number(selectedCharacter),
                            hashtags: hashtags.map((text) => text.slice(1)),
                        });
                        router.push(`/memos`);
                    }}
                    disabled={textareaValue.length === 0 || selectedCharacter === ''}
                    className="p-3 text-semibold16 text-[#1E73F3] transition-colors disabled:pointer-events-none disabled:text-gray-300"
                >
                    저장
                </button>
            </header>
            <Select
                onValueChange={(value) => {
                    setSelectedCharacter(value);
                }}
            >
                <div className="flex flex-row items-center gap-[10px] px-6">
                    <SelectTrigger className="w-[160px] border-none bg-gray-100 outline-none focus:outline-none focus:ring-0">
                        <SelectValue
                            placeholder={
                                <div className="felx-row flex gap-[6px]">
                                    <span className="h-6 w-6 rounded-full bg-[#d7e7ff]" />
                                    <span>캐릭터 선택</span>
                                </div>
                            }
                        />
                    </SelectTrigger>
                    <span>의 말</span>
                </div>
                <SelectContent className="border-none bg-gray-100">
                    <SelectGroup className="bg-gray-100">
                        {charactersResponse?.characters.map((chracter, i) => (
                            <SelectItem value={chracter.id + ''} key={i}>
                                <div className="felx-row flex gap-[6px]">
                                    <span className="h-6 w-6 rounded-full bg-[#d7e7ff]">
                                        <Image width={24} height={24} alt="" src={chracter.characterImage} />
                                    </span>
                                    <span>{chracter.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <TextareaAutosize
                ref={textareaRef}
                cacheMeasurements
                placeholder="메모를 입력해주세요"
                value={textareaValue}
                onChange={(e) => {
                    if (e.target.value.length > 200) return;
                    setTextareaValue(e.target.value);
                }}
                className="min-h-[188px] px-6 py-[10px] focus:outline-none"
            />
            <p className="py-2 pr-6 text-right text-gray-300">{textareaValue.length}/200</p>
            <div className="mt-2 h-[12px] bg-[#F7F8F9]" />
            <div className="px-6 py-3 text-semibold14 text-gray-500">해시태그</div>
            <div className="flex flex-wrap gap-[6px] px-6">
                {hashtags.length === 0 ? (
                    <span className="text-gray-400">
                        해쉬태그로 키워드를 생성할 수 있어요.
                        <br /> ex) #넥스터즈
                    </span>
                ) : (
                    hashtags.map((hashtag, i) => (
                        <span
                            className="min-h-[37px] w-fit break-all rounded-full bg-[#ECEFF5] px-3 py-2 text-semibold14 text-gray-400"
                            key={i}
                        >
                            {hashtag}
                        </span>
                    ))
                )}
            </div>
        </PageContainer>
    );
}
