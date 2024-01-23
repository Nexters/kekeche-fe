import CircleIcon from '@/assets/icons/circle_101x101.svg';
import SqaureIcon from '@/assets/icons/square_101x101.svg';
import TriangleIcon from '@/assets/icons/triangle_120x103.svg';

export const Shapes = [
    {
        id: 0,
        name: 'circle',
        icon: CircleIcon,
    },
    {
        id: 1,
        name: 'square',
        icon: SqaureIcon,
    },
    {
        id: 2,
        name: 'triangle',
        icon: TriangleIcon,
    },
];

export const Colors = [
    {
        id: 0,
        name: 'red',
        hexClassName: 'bg-[#FA6A6A]',
    },
    {
        id: 1,
        name: 'orange',
        hexClassName: 'bg-[#FAB86A]',
    },
    {
        id: 2,
        name: 'yellow',
        hexClassName: 'bg-[#FAE36A]',
    },
    {
        id: 3,
        name: 'green',
        hexClassName: 'bg-[#8FFA6A]',
    },
    {
        id: 4,
        name: 'blue',
        hexClassName: 'bg-[#6AC6FA]',
    },
    {
        id: 5,
        name: 'purple',
        hexClassName: 'bg-[#EE6AFA]',
    },
];

export const Keywords = [
    { id: 0, name: '개성이 있는', icon: '' },
    { id: 1, name: '결단력 있는', icon: '' },
    //TODO: 확정되면 추가하기...
];

export const Items = [
    {
        id: 0,
        name: '노트북',
    },
    {
        id: 1,
        name: '운동',
    },
    {
        id: 2,
        name: '돈',
    },
    {
        id: 3,
        name: '연필',
    },
    {
        id: 4,
        name: '책',
    },
    {
        id: 5,
        name: '없음',
        // TODO: '없음'을 어떻게 처리할지 백엔드와 협의 필요
    },
];
