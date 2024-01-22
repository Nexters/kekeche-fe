import { useContext } from 'react';
import ShapeButton from './shape-button';
import { CreateCharacterDispatchContext } from '@/context/create-character-provider';

export default function SelectShape() {
    const dispatchContext = useContext(CreateCharacterDispatchContext);

    const handleClick = (colorId: number) => {
        dispatchContext?.setValue('color', colorId);
    };

    return (
        <div className="flex flex-col gap-[16px]">
            {/**
             * TODO: 실제 색상 정보 추가
             */}
            {[0, 1, 2, 3].map((colorId) => (
                <ShapeButton key={colorId} onClick={() => handleClick(colorId)} colorId={colorId} />
            ))}
        </div>
    );
}
