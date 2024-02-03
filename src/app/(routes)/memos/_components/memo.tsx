'use client';

import deleteMemo from '@/services/deleteMemo';
import { IMemo } from '@/types/memo';
import { getCookie } from 'cookies-next';
import ActionButton from './action-button';

type Props = {
    memo: IMemo;
};

export default function Memo({
    memo: {
        content,
        character: { name },
        id,
        createdAt,
    },
}: Props) {
    return (
        <div className="flex h-auto w-[327px] flex-col gap-[12px] rounded-[16px] bg-[#F8F8FB] p-[24px]">
            <div className=" flex justify-between ">
                <div className="font-400 flex h-[28px] w-[53px] items-center justify-center rounded-[8px] bg-[#FFE3E7] text-[12px] text-[#E57897] ">
                    {name}
                </div>
                <button>
                    <ActionButton
                        onClick={async () => {
                            await deleteMemo({
                                accessToken: `${getCookie('accessToken')}`,
                                memoId: id,
                            });
                            location.reload();
                        }}
                    />
                </button>
            </div>
            <p className="text-regular16 leading-[24px] text-[#4B4F58]">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </p>
            <div className="text-regular14 text-[#8E939E]">{createdAt}</div>
        </div>
    );
}
