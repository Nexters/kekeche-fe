import { Keywords as KeywordsArray } from '@/constants/character-info';
import { twMerge } from 'tailwind-merge';

function Keyword({ id }: { id: number }) {
    return (
        <li
            className={twMerge(
                'rounded-[8px] px-[12px] py-[4px] text-[12px] font-[500]',
                KeywordsArray[id].colorClassname,
            )}
        >
            {KeywordsArray[id].name}
        </li>
    );
}

export default function Keywords({ keywordIds, className }: { keywordIds: number[]; className?: string }) {
    return (
        <ul className={twMerge('mt-[6px] flex gap-[4px]', className)}>
            {keywordIds.map((keywordIdx) => (
                <Keyword id={keywordIdx} key={keywordIdx} />
            ))}
        </ul>
    );
}
