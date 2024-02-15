import BeanIcon from '@/assets/icons/bean_16x16.svg';
import { Colors } from '@/constants/character-info';
import { Character } from '@/types/character';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    character: Character;
    component: 'div' | 'link';
    href?: string;
}

export default function CharacterCard({ character, component, href }: Props) {
    const getColorFromUrl = (url: string) => {
        const match = url.match(/\/(\d+)\.webp$/);

        if (!match) return;

        const colorEnum = parseInt(match[1], 10);
        return Colors[colorEnum].hexClassName;
    };

    const bgColor = getColorFromUrl(character.characterImage);

    const content = (
        <>
            <div
                className={`mx-auto mb-2 flex w-fit items-center gap-[2px] rounded-full px-2 py-1 ${bgColor ?? 'bg-[#2777ea]'}`}
            >
                <span className="h-4 w-4">
                    <BeanIcon />
                </span>
                <span className="text-[12px] font-semibold leading-[11px] text-white">{`Lv.${character.level}`}</span>
            </div>
            <div className="mb-1 h-[120px] w-[120px] rounded-lg bg-white">
                <div className="relative mx-auto h-[100px] w-[100px]">
                    <Image
                        priority
                        quality={100}
                        width={100}
                        height={100}
                        alt={character.name}
                        style={{
                            objectFit: 'cover',
                        }}
                        src={character.characterImage}
                        className="absolute left-0 right-0"
                    />
                    {character.itemImage && (
                        <Image
                            quality={100}
                            priority
                            style={{
                                objectFit: 'cover',
                            }}
                            src={character.itemImage}
                            alt={character.name}
                            className="absolute left-0 top-0"
                            width={100}
                            height={100}
                        />
                    )}
                </div>
            </div>
            <p className="text-bold14 text-contentPrimaryLight">{character.name}</p>
        </>
    );

    const layoutClassNames =
        'flex flex-col items-center justify-center rounded-2xl border border-[#f3f4f6] bg-[#ffffff]  py-[18px]';

    if (component === 'link' && href) {
        return (
            <Link href={href} className={layoutClassNames}>
                {content}
            </Link>
        );
    }
    return <div className={layoutClassNames}>{content}</div>;
}
