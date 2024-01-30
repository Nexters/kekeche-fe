import Memo from './memo';

// memo 목록 fetch 후 렌더링
export default function MemosContainer() {
    return (
        <div className="flex w-[375px] justify-center ">
            <Memo />
        </div>
    );
}
