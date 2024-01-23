import { useContext } from 'react';
import { CreateCharacterDispatchContext } from '@/context/create-character-provider';
import { Shapes } from '@/components/create-character/constants/create-character-inputs';
import { CarouselDispatchContext } from '..';

export default function SelectShape() {
    const characterDispatch = useContext(CreateCharacterDispatchContext);
    const carouselDispatch = useContext(CarouselDispatchContext);

    const handleClick = (id: number) => {
        characterDispatch?.setValue('shape', id);
        carouselDispatch?.handleNextClick();
    };

    return (
        <div className="flex flex-col gap-[16px]">
            {Shapes.map(({ id, icon: Icon }) => (
                <button
                    className="flex h-[129px] w-[279px] items-center justify-center rounded-[16px] bg-[#F7F8F9]"
                    key={id}
                    onClick={() => handleClick(id)}
                >
                    <Icon />
                </button>
            ))}
        </div>
    );
}
