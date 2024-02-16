'use client';

import CreateMemo from '.';
import { useSearchParams } from 'next/navigation';
import EditMemo from '../edit-memo';

export default function WriteMemoContainer() {
    const searchParams = useSearchParams();
    const isOn = searchParams.get('write') === 'on';
    const editId = searchParams.get('edit');

    return (
        <>
            {isOn && <CreateMemo />}
            {editId !== null && <EditMemo id={Number(editId)} />}
        </>
    );
}
