import MockCharacterImage from '@/assets/images/mock_chracter_80x80.png'
import { PageContainer } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <PageContainer hasNavigator>
            <div className="mb-2 px-6 py-2 text-bold24">윤서님의 캐릭터</div>
            <div className="grid grid-cols-2 gap-3 px-6 py-2">
                {Array(4)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <Link
                                href=""
                                key={i}
                                className="flex h-[200px] w-40 flex-col items-center justify-center gap-1 rounded-xl bg-backgroundSecondaryLight px-4"
                            >
                                <div className="flex flex-col items-center text-semibold16 text-contentPrimaryLight">
                                    <div>
                                        <Image alt="몰랑이" src={MockCharacterImage} />
                                    </div>
                                    <div className="flex flex-col text-semibold16">
                                        <span>책 읽어야대</span>
                                        <span>Lv.12</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-[2.6px]">
                                    <div className="grid h-[22px] place-items-center rounded-sm bg-gray-400 px-2">
                                        <span className="min-w-fit text-[10px] text-gray-100">#열정적</span>
                                    </div>
                                    <div className="grid h-[22px] place-items-center rounded-sm  bg-gray-400 px-2">
                                        <span className="text-[10px] text-gray-100">#꼼꼼한</span>
                                    </div>

                                    <div className="grid h-[22px] place-items-center rounded-sm  bg-gray-400 px-2">
                                        <span className="min-w-fit text-[10px] text-gray-100">#열정적</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                <CharacterCreateButton />
            </div>
        </PageContainer>
    )
}

function CharacterCreateButton() {
    return (
        <Link href="" className="grid h-[200px] w-40 place-items-center rounded-xl bg-backgroundSecondaryLight">
            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M56.75 32.1797H32.75V56.1797H24.75V32.1797H0.75V24.1797H24.75V0.179688H32.75V24.1797H56.75V32.1797Z"
                    fill="#DCDCDC"
                />
            </svg>
        </Link>
    )
}
