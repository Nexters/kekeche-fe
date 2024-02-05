import Link from 'next/link';

export default function CharacterCreateLink() {
    return (
        <Link
            href="/"
            className="w-[340px] rounded-full bg-[#606FD8] px-6 py-[14px] text-center text-semibold18 text-white"
        >
            나도 캐릭터 만들러 가기
        </Link>
    );
}
