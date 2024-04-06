'use client';

import { useSearchParams } from 'next/navigation';
import { AnimatePresence, AnimationProps, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import EditMemo from '@/components/edit-memo';
import CreateMemo from '@/components/create-memo';

const animationProps: AnimationProps = {
    initial: { y: '100vh' },
    animate: { y: 0 },
    exit: { y: '100vh' },
    transition: { duration: 0.2 },
};

export default function MemoOverlay() {
    const searchParams = useSearchParams();

    const [isOn, setIsOn] = useState<null | string>(null);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        if (searchParams.get('write') !== null) {
            setIsOn(searchParams.get('write'));
        } else setIsOn(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get('write')]);

    useEffect(() => {
        if (searchParams.get('edit') !== null) {
            setEditId(searchParams.get('edit'));
        } else {
            setEditId(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get('edit')]);

    if (typeof document !== 'undefined') {
        if (isOn !== null || editId !== null) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    return (
        <>
            <AnimatePresence>
                {isOn !== null && (
                    <motion.div
                        key="create-modal"
                        {...animationProps}
                        className="fixed left-0 top-0 z-[100] h-[100vh] w-full bg-[#f5f5f5]"
                    >
                        <div className="mx-auto h-full w-auto bg-white lg:w-[400px]">
                            <CreateMemo characterId={isOn === 'on' ? undefined : isOn} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {editId !== null && (
                    <motion.div
                        key="edit-modal"
                        {...animationProps}
                        className="fixed left-0 top-0 z-[100] h-[100vh] w-full bg-[#f5f5f5]"
                    >
                        <div className="mx-auto h-full w-auto bg-white lg:w-[400px] ">
                            <EditMemo id={Number(editId)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
