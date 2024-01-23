import { useContext } from 'react';
import { CreateCharacterDispatchContext } from '@/context/create-character-provider';
import { Shapes } from '@/components/create-character/constants/create-character-inputs';

export default function SelectShape() {
    const dispatchContext = useContext(CreateCharacterDispatchContext);

    const handleClick = (colorId: number) => {
        dispatchContext?.setValue('shape', 0);
    };

    return (
        <div className="flex flex-col gap-[16px]">
            {/**
             * TODO: 실제 색상 정보 추가
             */}
            {Shapes.map((shapeId) => (
                <></>
            ))}
        </div>
    );
}
