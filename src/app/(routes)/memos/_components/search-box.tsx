import SearchIcon from '@/assets/icons/search_20x20.svg';

export default function SearchBox() {
    return (
        <section className="w-full px-[24px] py-[16px]">
            <div className="flex h-[48px] w-[328px] gap-[10px] rounded-[30px] border-[1.4px] border-solid border-[#-[#DFE2EA]] bg-[#FCFDFF] px-[16px] py-[12px]">
                <input
                    type="text"
                    className="text-black h-full w-[266px] border-none text-regular16 outline-none"
                    placeholder="해시태그를 입력하세요"
                />
                <SearchIcon />
            </div>
        </section>
    );
}
