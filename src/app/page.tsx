import Link from 'next/link';

export default function Home() {
    return (
        <div className="grid place-items-center">
            <h1>캐릭캐릭 다이어리🧚‍♀️</h1>
            <Link href={'/create'}>
                <button>생성하기</button>
            </Link>
        </div>
    );
}
