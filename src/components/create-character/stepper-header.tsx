import { ArrowLeft } from 'lucide-react';
import TopBar from '../ui/top-bar';
import useCarousel from './hooks/useCarousel';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const WidthClassByStep: Record<number, string> = {
    1: 'w-[16.6%]',
    2: 'w-[33.3%]',
    3: 'w-[50%]',
    4: 'w-[66.6%]',
    5: 'w-[83.3%]',
};

export default function StepperHeader() {
    const { handlePrevClick } = useCarousel();
    const step = Number(useSearchParams().get('step'));

    return (
        <>
            {step !== null && step >= 1 && step <= 5 && (
                <div className="fixed mx-auto flex w-screen  min-w-[350px] flex-col items-center bg-white lg:w-[400px]">
                    <TopBar>
                        <TopBar.Left>
                            <button className="flex h-full w-[16px] items-center " onClick={handlePrevClick}>
                                <ArrowLeft />
                            </button>
                        </TopBar.Left>
                        <TopBar.Text>{'캐릭터 만들기'}</TopBar.Text>
                    </TopBar>
                    <div className="relative h-[4px] w-full bg-[#D9D9D9]">
                        <motion.div
                            layout
                            className={`absolute left-0 top-0 h-full bg-primary-500 ${WidthClassByStep[step]}`}
                        ></motion.div>
                    </div>
                </div>
            )}
        </>
    );
}
