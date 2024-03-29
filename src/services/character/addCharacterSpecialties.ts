import { NewSpecialty } from '@/types/specialty';

export type AddCharacterSpecialtiesRequest = {
    accessToken: string;
    characterId: number;
    specialties: NewSpecialty[];
};

export default async function addCharacterSpecialties({
    characterId,
    accessToken,
    specialties: newSpecialty,
}: AddCharacterSpecialtiesRequest) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/character/${characterId}/specialty`,
            {
                method: 'POST',
                headers: {
                    Authorization: `${accessToken}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    specialties: newSpecialty,
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
