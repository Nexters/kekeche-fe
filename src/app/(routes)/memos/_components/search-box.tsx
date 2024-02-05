'use client';

import SearchIcon from '@/assets/icons/search_20x20.svg';
import useDebounce from '@/hooks/useDebounce';
import useSetQueryParam from '@/hooks/useSetQueryParam';
import { useEffect, useState } from 'react';

export default function SearchBox() {
    const [value, setValue] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const queryValue = useDebounce(value, 500);

    const setQueryParam = useSetQueryParam();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDirty(true);
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        (queryValue.length > 0 || isDirty) && setQueryParam('search', queryValue);
    }, [queryValue, setQueryParam, isDirty]);

    return (
        <section className="w-full px-[24px] py-[16px]">
            <div className="flex h-[48px] w-full gap-[10px] rounded-[30px] border-[1.4px] border-solid border-[#-[#DFE2EA]] bg-[#FCFDFF] px-[16px] py-[12px]">
                <input
                    type="text"
                    className="text-black h-full w-full border-none text-regular16 outline-none"
                    placeholder="해시태그를 입력하세요"
                    value={value}
                    onChange={handleChange}
                />
                <SearchIcon />
            </div>
        </section>
    );
}
