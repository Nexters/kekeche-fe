import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export default function AnimationProvider({ children }: PropsWithChildren) {
    return (
        <motion.div className="fixed left-0 top-0 z-[10] h-[100vh] w-full bg-[#f5f5f5]">
            <div className="mx-auto h-full w-[400px] bg-white">{children}</div>
        </motion.div>
    );
}
