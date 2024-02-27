import { Character } from '@/types/character';
import { redirect } from 'next/navigation';

export type GetCharactersResponse = {
    characters: Character[];
    isMe: boolean;
    memberNickname: string;
    cheerCount: number;
    memoCount: number;
    joinDays: number;
};

export type GetCharactersRequest = {
    memberId: number;
    accessToken?: string;
};

export default async function getCharacters(request: GetCharactersRequest): Promise<GetCharactersResponse | undefined> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/member/${request.memberId}`,
            request.accessToken
                ? {
                      headers: {
                          Authorization: `${request.accessToken}`,
                      },
                  }
                : undefined,
        );
        if (res.ok) {
            const json = await res.json();
            return json.data;
        } else {
            throw new Error('존재하지 않는 유저 페이지에요!');
        }
    } catch {
        redirect('/');
    }
}
