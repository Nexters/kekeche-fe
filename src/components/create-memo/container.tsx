'use client';

import CreateMemo from '.';
import { useSearchParams } from 'next/navigation';
import EditMemo from '../edit-memo';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WriteMemoContainer() {
    const searchParams = useSearchParams();

    const [isOn, setIsOn] = useState<null | string>(null);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        if (searchParams.get('write') !== null) {
            setIsOn(searchParams.get('write'));
        } else setIsOn(null);
    }, [searchParams.get('write')]);

    useEffect(() => {
        if (searchParams.get('edit') !== null) {
            setEditId(searchParams.get('edit'));
        } else {
            setEditId(null);
        }
    }, [searchParams.get('edit')]);

    if (isOn !== null || editId !== null) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    return (
        <>
            <AnimatePresence>
                {isOn !== null && (
                    <motion.div
                        key="create-modal"
                        initial={{ opacity: 0, y: '100vh' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100vh' }}
                        transition={{ duration: 0.2, type: 'just' }}
                        className="fixed left-0 top-0 z-[100] h-[100vh] w-full bg-[#f5f5f5]"
                    >
                        <div className="mx-auto h-full w-[400px] bg-white">
                            <CreateMemo characterId={isOn === 'on' ? null : isOn} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {editId !== null && (
                    <motion.div
                        key="edit-modal"
                        initial={{ opacity: 0, y: '100vh' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100vh' }}
                        transition={{ type: 'just' }}
                        className="py-[20 fixed left-0 top-0 z-[100] h-[100vh] w-full bg-[#f5f5f5]"
                    >
                        <div className="mx-auto h-full w-[400px] bg-white ">
                            <EditMemo id={Number(editId)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
