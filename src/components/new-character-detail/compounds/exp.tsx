import { motion, animate } from 'framer-motion';

type ExpAnimationProps = {
    /**
     * 포커스 애니메이션
     */
    animate: boolean;
    /**
     * exp바 애니메이션
     */
    expAnimating: boolean;
};

type Props = ExpAnimationProps & {
    /**
     * 현재 레벨
     */
    level: number;
    /**
     * 현재 exp
     */
    currentExp: number;
    /**
     * 레벯업을 위한 exp
     */
    nextExp: number;
};

export default function Exp({ animate, expAnimating, currentExp, nextExp, level }: Props) {
    return (
        <motion.div
            layoutId="exp"
            layout
            className="mt-[20px] flex h-[56px] w-[327px] items-center justify-center gap-[20px] rounded-[16px] bg-white"
        >
            <span className="text-[16px] font-bold text-primary-500">{`LV.${level}`}</span>
            <div className="relative h-[24px] w-[233px] overflow-hidden rounded-full bg-newGray-400">
                <motion.div
                    layout
                    transition={{ delay: 1.5 }}
                    style={{
                        width: animate
                            ? expAnimating
                                ? `${(currentExp / nextExp) * 100}%`
                                : `${((currentExp - 1) / nextExp) * 100}%`
                            : `${(currentExp / nextExp) * 100}%`,
                    }}
                    className={` left-0 top-0 h-full rounded-full bg-primary-500 `}
                />
                <div className="absolute right-[14.4px] top-0 flex h-full items-center">
                    <span className="text-[12px] font-semibold text-white">{`${currentExp}/${nextExp}`}</span>
                </div>
            </div>
        </motion.div>
    );
}
