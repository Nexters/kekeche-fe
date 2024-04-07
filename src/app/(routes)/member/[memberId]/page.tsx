import EggImage from '@/assets/images/egg.png';
import PencilImage from '@/assets/images/pencil.png';
import { PageContainer } from '@/components/ui';
import A2HS from '@/hooks/useA2HS';
import getMember from '@/services/auth/getMember';
import getCharacters from '@/services/character/getCharacters';
import { cookies } from 'next/headers';
import Image from 'next/image';
import CharacterCard from './character-card';
import CharacterCreateButton from './character-create-button';
import CharacterCreateLink from './character-create-link';
import { LikeButton, LikeButtonWithTooltip } from './like-button';
import PageContainerV2 from '@/components/page-container-v2/page-container-v2';

const MAXIMUM_CHARACTER = 6;

export default async function Home({ params: { memberId } }: { params: { memberId: string } }) {
    const accessToken = cookies().get('accessToken')?.value;

    const characters = await getCharacters({
        memberId: Number(memberId),
        accessToken,
    });

    const isMyPage = characters?.isMe;
    const headerText = `${characters?.memberNickname}의 도감 `;
    const showCharacterCreateButton = isMyPage && characters.characters.length < MAXIMUM_CHARACTER;

    return (
        <PageContainerV2 hasNavigator={characters?.isMe}>
            <div className="flex flex-1 flex-col">
                <header className="flex items-center justify-between py-5 pl-6 pr-7">
                    <h1 className="text-bold24 text-[#494E59]">{headerText}</h1>
                    {isMyPage ? (
                        <LikeButton component="div" cheerCount={characters.cheerCount} />
                    ) : (
                        <LikeButtonWithTooltip component="button" cheerCount={characters?.cheerCount ?? 0} />
                    )}
                </header>
                <section className="mb-5 px-6">
                    <h2 className="mb-[10px] pt-5 text-[20px] font-bold leading-[32px] text-[#494E59]">성장과정</h2>
                    <div className="flex justify-between gap-[10px] pb-[6px]">
                        <div className="flex flex-1 items-center justify-between rounded-xl bg-[#F6F8FC] px-5 py-[18px]">
                            <div>
                                <div className="text-[12px] font-medium leading-[18px] text-[#8B92A0]">성장한지</div>
                                <div className="text-[20px] font-bold leading-[30px] text-[#2777EA]">
                                    {characters?.joinDays}일
                                </div>
                            </div>
                            <div className="flex h-[50px] w-[50px] rounded-lg bg-white">
                                <Image
                                    alt=""
                                    objectFit="cover"
                                    priority
                                    width={50}
                                    height={50}
                                    src={EggImage}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-between rounded-xl  bg-[#F6F8FC] px-5 py-[18px]">
                            <div>
                                <div className="text-[12px] font-medium leading-[18px] text-[#8B92A0]">총 메모</div>
                                <div className="text-[20px] font-bold leading-[30px] text-[#2777EA]">
                                    {characters?.memoCount}개
                                </div>
                            </div>
                            <div className="flex h-[50px] w-[50px] rounded-lg bg-white">
                                <Image
                                    alt=""
                                    objectFit="cover"
                                    priority
                                    width={50}
                                    height={50}
                                    src={PencilImage}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex-1 bg-[#F6F8FC] px-6 pb-[90px]">
                    <h2 className="mb-[10px] pt-5 text-[20px] font-bold leading-[32px] text-[#494E59]">성장 기록지</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {characters?.characters?.map((character, i) => {
                            if (isMyPage)
                                return (
                                    <CharacterCard
                                        key={character.id}
                                        component="link"
                                        href={`/character/${character.id}`}
                                        character={character}
                                        order={i}
                                    />
                                );
                            return <CharacterCard order={i} key={character.id} component="div" character={character} />;
                        })}
                        {showCharacterCreateButton && <CharacterCreateButton />}
                    </div>
                </section>
            </div>

            {!isMyPage && (
                <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center  py-4">
                    <CharacterCreateLink />
                </div>
            )}
            <A2HS />
        </PageContainerV2>
    );
}
