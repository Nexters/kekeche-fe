import { Steps } from '@/components/create-character/types/steps';
import Link from 'next/link';

export default function CharacterCreateButton() {
    return (
        <Link
            href={`/create?step=${Steps.SetName}`}
            className="shadow-slate-50 grid h-[215px]  place-items-center  rounded-2xl bg-white shadow-md"
        >
            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M32 18.7857H18.2857V32.5H13.7143V18.7857H0V14.2143H13.7143V0.5H18.2857V14.2143H32V18.7857Z"
                    fill="#DFE2EA"
                />
            </svg>
        </Link>
    );
}
