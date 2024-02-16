'use client';

import CreateMemo from '.';
import { useSearchParams } from 'next/navigation';

export default function WriteMemoContainer() {
    const searchParams = useSearchParams();
    const isOn = searchParams.get('write') === 'on';

    return <>{isOn && <CreateMemo />}</>;
}
