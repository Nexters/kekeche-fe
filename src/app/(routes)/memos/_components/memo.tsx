'use client';

import deleteMemo from '@/services/memo/deleteMemo';
import { Memo } from '@/types/memo';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import ActionButton from './action-button';

type Props = {
    memo: Memo;
};

export default function Memo({ memo: { content, createdAt, id, character, modified, htmlContent } }: Props) {
    return (
        <div className="flex h-auto w-full flex-col gap-[12px] rounded-[16px] bg-[#F8F8FB] p-[24px]">
            <div className=" flex justify-between ">
                <div className="font-400 flex h-[28px] items-center justify-center rounded-[8px] bg-purple-100 px-[4px] text-[12px] text-purple-200 ">
                    {character.name}
                </div>
                <div>
                    <ActionButton
                        onClick={async () => {
                            await deleteMemo({
                                accessToken: `${getCookie('accessToken')}`,
                                memoId: id,
                            });
                            location.reload();
                        }}
                    />
                </div>
            </div>
            <div className="text-regular16 leading-[24divx] text-[#4B4F58]">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            <div className="text-regular14 text-[#8E939E]">
                {dayjs(createdAt).format('YYYY.MM.DD HH:mm A')} {modified && '(수정 됨)'}
            </div>
        </div>
    );
}
