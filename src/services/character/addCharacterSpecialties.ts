import { NewSpecialty } from '@/types/specialty';

export type AddCharacterSpecialtiesRequest = {
    accessToken: string;
    characterId: number;
    specialties: NewSpecialty[];
};

export default async function addCharacterSpecialties({
    characterId,
    accessToken,
    specialties,
}: AddCharacterSpecialtiesRequest) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/${characterId}/specialty`,
            {
                method: 'POST',
                headers: {
                    Authorization: `${accessToken}`,
                },
                body: JSON.stringify({
                    specialties,
                }),
            },
        );
        if (res.ok) {
            const json = await res.json();
            return json.data;
        }
    } catch {
        return undefined;
    }
}
