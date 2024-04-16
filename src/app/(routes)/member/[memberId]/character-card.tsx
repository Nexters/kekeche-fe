import { Character } from '@/types/character';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
    character: Character;
    component: 'div' | 'link';
    order: number;
    href?: string;
}

const Colors = [
    {
        id: 0,
        name: 'orange',
        hexClassName: 'bg-[#FF7864]',
    },
    {
        id: 1,
        name: 'violet',
        hexClassName: 'bg-[#757EF7]',
    },
    {
        id: 2,
        name: 'yellow',
        hexClassName: 'bg-[#E7B110]',
    },
    {
        id: 3,
        name: 'purple',
        hexClassName: 'bg-[#BF6DFF]',
    },
    {
        id: 4,
        name: 'green',
        hexClassName: 'bg-[#6DBD05]',
    },
    {
        id: 5,
        name: 'pink',
        hexClassName: 'bg-[#EC6BDF]',
    },
] as const;

const characterTagStrings = ['첫번째 나', '두번째 나', '세번째 나', '네번째 나', '다섯번째 나', '여섯번째 나'];

export default function CharacterCard({ character, component, href, order }: Props) {
    const getColorFromUrl = (url: string) => {
        const match = url.match(/\/(\d+)\.webp$/);

        if (!match) return;

        const colorEnum = parseInt(match[1], 10);
        return Colors[colorEnum];
    };

    const color = getColorFromUrl(character.characterImage);

    const content = (
        <>
            <div className={`flex w-fit items-center gap-[2px] rounded-full px-2 py-1 ${color?.hexClassName}`}>
                <span className={`text-[10px] font-semibold leading-[11px] text-white`}>
                    {characterTagStrings[order]}
                </span>
            </div>

            <div className="relative mx-auto my-[10px] h-[100px] w-[100px]">
                <Image
                    priority
                    width={100}
                    height={100}
                    alt={character.name}
                    src={character.characterImage}
                    className="absolute left-0 right-0"
                />
                {character.itemImage && (
                    <Image
                        priority
                        src={character.itemImage}
                        alt={character.name}
                        className="absolute left-0 top-0"
                        width={100}
                        height={100}
                    />
                )}
            </div>

            <div>
                <p className="mb-1 text-center text-bold14 text-contentPrimaryLight">{character.name}</p>
                <div className="flex items-center gap-1">
                    <p className="text-semibold10 text-[#2777ea]">Lv.{character.level}</p>
                    <div className="w-[90px] rounded-full bg-[#ECEFF5]">
                        <div
                            className="h-2  rounded-full bg-[#2777EA]"
                            style={{
                                width: `${(character.currentExp / character.nextExp) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );

    const layoutClassNames =
        'flex flex-col items-center justify-center rounded-2xl border border-[#f3f4f6] bg-[#ffffff]  py-[18px]';

    if (component === 'link' && href) {
        return (
            <Link
                href={href}
                className={twMerge(
                    'shadow-[0px_8px_24px_rgba(149,157,165,0.1)] active:shadow-[inset_0px_1px_3px_0px_rgba(0,0,0,0.1)]',
                    layoutClassNames,
                )}
            >
                {content}
            </Link>
        );
    }
    return <div className={layoutClassNames}>{content}</div>;
}
