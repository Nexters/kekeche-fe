'use client';

import FixedBottomArea from '@/components/fixed-bottom-area';
import CTAButton from '@/components/ui/cta-button';
import { Member } from '@/services/auth/getMember';
import { useCharactersQuery } from '@/store/query/useCharactersQuery';
import { Characters } from './characters';
import { Header } from './header';
import { MemberData } from './member-data';
import Link from 'next/link';

type Props = {
    memberId: Member['memberId'];
};

export function CharactersContainer({ memberId }: Props) {
    const {
        data: { characters, cheerCount, memberNickname, isMe, joinDays, memoCount },
    } = useCharactersQuery(memberId);

    const isMyPage = isMe;

    return (
        <>
            <div className="flex flex-1 flex-col">
                <Header cheerCount={cheerCount} memberNickname={memberNickname} isMyPage={isMyPage} />
                <MemberData joinDays={joinDays} memoCount={memoCount} />
                <Characters isMyPage={isMyPage} characters={characters} />
            </div>
            {!isMyPage && <FixedBottomArea contents={<CTAButton as={Link} href="/" text="내 캐릭터 만들러 가기" />} />}
        </>
    );
}
