'use client';

import SearchIcon from '@/assets/icons/search_20x20.svg';
import useDebounce from '@/hooks/useDebounce';
import useSetQueryParam from '@/hooks/useSetQueryParam';
import { useEffect, useState } from 'react';

export default function SearchBox() {
    const [value, setValue] = useState('');
    const queryValue = useDebounce(value, 500);

    const setQueryParam = useSetQueryParam();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        queryValue.length >= 0 && setQueryParam('search', queryValue);
    }, [queryValue, setQueryParam]);

    return (
        <section className="w-full px-[24px] py-[16px]">
            <div className="flex h-[48px] w-[328px] gap-[10px] rounded-[30px] border-[1.4px] border-solid border-[#-[#DFE2EA]] bg-[#FCFDFF] px-[16px] py-[12px]">
                <input
                    type="text"
                    className="text-black h-full w-[266px] border-none text-regular16 outline-none"
                    placeholder="해시태그를 입력하세요"
                    value={value}
                    onChange={handleChange}
                />
                <SearchIcon />
            </div>
        </section>
    );
}
