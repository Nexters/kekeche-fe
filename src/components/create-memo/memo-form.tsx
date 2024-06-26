'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui-shadcn/select';
import { CharacterWithThumbnail } from '@/types/character';
import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { CreateMemoContext } from './create-memo-context';

interface Props {
    characters: CharacterWithThumbnail[];
}

export default function MemoForm({ characters }: Props) {
    const context = useContext(CreateMemoContext);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    if (!context) return;

    context.selectedCharacterId !== undefined && context.setMemoInvalid(false);

    const isCharacterMemoInValid =
        !!context.selectedCharacterId &&
        !characters.find((c) => Number(context.selectedCharacterId) === c.id)?.isMemoValid;

    const errorText = (() => {
        switch (true) {
            case !!context.selectedCharacterId &&
                !characters.find((c) => Number(context.selectedCharacterId) === c.id)?.isMemoValid: {
                context.setMemoInvalid(isCharacterMemoInValid);
                return <p className="text-semibold14 text-[#F04141]">캐릭터당 하루 최대 메모 개수는 3개예요!</p>;
            }

            case !context.selectedCharacterId: {
                return <p className="text-semibold14 text-[#F04141]">캐릭터를 선택해야 저장이 됩니다.</p>;
            }
            case !context.content: {
                return <p className="text-semibold14 text-[#F04141]">내용을 작성해야 저장이 됩니다.</p>;
            }
            default:
                return null;
        }
    })();

    return (
        <div>
            <Select
                disabled={context.selectedCharacterId !== undefined}
                defaultValue={context.selectedCharacterId}
                onValueChange={(value) => {
                    context.setMemoInvalid(false);
                    context.changeCharacter(value);
                }}
            >
                <div className="flex flex-row items-center gap-[10px] px-6">
                    <SelectTrigger className="w-[160px] border-none bg-gray-100 outline-none focus:outline-none focus:ring-0">
                        <SelectValue
                            placeholder={
                                <div className="felx-row flex items-center gap-[6px]">
                                    <span className="h-6 w-6 rounded-full bg-[#d7e7ff]" />
                                    <span className="text-semibold14 text-[#a6aab4]">캐릭터 선택</span>
                                </div>
                            }
                        />
                    </SelectTrigger>
                    <span>의 말</span>
                </div>
                <SelectContent className="z-[102] border-none bg-gray-100">
                    <SelectGroup className="bg-gray-100">
                        {characters.map((chracter, i) => (
                            <SelectItem value={chracter.id + ''} key={i}>
                                <div className="felx-row flex gap-[6px]">
                                    <span className="h-6 w-6 rounded-full bg-[#d7e7ff]">
                                        <Image
                                            quality={100}
                                            width={24}
                                            height={24}
                                            alt=""
                                            style={{ objectFit: 'cover' }}
                                            className="rounded-full"
                                            src={chracter.characterImage}
                                        />
                                    </span>
                                    <span className="text-semibold14 text-[#333333]">{chracter.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <TextareaAutosize
                autoFocus={false}
                ref={textareaRef}
                cacheMeasurements
                placeholder="메모를 입력해주세요"
                value={context.content}
                onChange={(e) => {
                    if (e.target.value.length > 200) return;
                    context.changeContent(e.target.value);
                }}
                className="min-h-[188px] w-full px-6 py-[10px] focus:outline-none"
            />
            <div className="flex justify-between px-6 py-2">
                {errorText}
                <p className="flex-1 text-right text-gray-300">{context.content.length}/200</p>
            </div>
        </div>
    );
}
