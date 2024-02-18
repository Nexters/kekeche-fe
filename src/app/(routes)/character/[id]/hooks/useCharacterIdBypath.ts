import { usePathname } from 'next/navigation';

export default function useCharacterIdBypath() {
    const pathname = usePathname();
    const characterId = Number(pathname.split('character/')[1]);
    return characterId;
}
