import Circle from '@/assets/images/circle.png';
import Sqaure from '@/assets/images/square.png';
import Triangle from '@/assets/images/triangle.png';

export const Shapes = [
    {
        id: 0,
        name: 'circle',
        image: Circle,
    },
    {
        id: 1,
        name: 'square',
        image: Sqaure,
    },
    {
        id: 2,
        name: 'triangle',
        image: Triangle,
    },
] as const;

export const Colors = [
    {
        id: 0,
        name: 'red',
        hexClassName: 'bg-[#FF7864]',
    },
    {
        id: 1,
        name: 'orange',
        hexClassName: 'bg-[#757EF7]',
    },
    {
        id: 2,
        name: 'yellow',
        hexClassName: 'bg-[#FFD557]',
    },
    {
        id: 3,
        name: 'green',
        hexClassName: 'bg-[#BF6DFF]',
    },
    {
        id: 4,
        name: 'blue',
        hexClassName: 'bg-[#A6EC49]',
    },
    {
        id: 5,
        name: 'purple',
        hexClassName: 'bg-[#EC6BDF]',
    },
] as const;

export const Keywords = [
    { id: 0, name: '다정한', colorClassname: 'bg-[#FFEEFD] text-[#EC6BDF]' },
    { id: 1, name: '귀여운', colorClassname: 'bg-[#FFEEFD] text-[#EC6BDF]' },
    { id: 2, name: '느긋한', colorClassname: 'bg-[#FFEEFD] text-[#EC6BDF]' },
    { id: 3, name: '감성적', colorClassname: 'bg-[#FFEEFD] text-[#EC6BDF]' },
    { id: 4, name: '낭만적', colorClassname: 'bg-[#FFEEFD] text-[#EC6BDF]' },
    { id: 5, name: '열정적', colorClassname: 'bg-[#FFF4F2] text-[#FF7864]' },
    { id: 6, name: '대담한', colorClassname: 'bg-[#FFF4F2] text-[#FF7864]' },
    { id: 7, name: '욕심 많은', colorClassname: 'bg-[#FFF4F2] text-[#FF7864]' },
    { id: 8, name: '도전적', colorClassname: 'bg-[#FFF4F2] text-[#FF7864]' },
    { id: 9, name: '단호한', colorClassname: 'bg-[#FFF4F2] text-[#FF7864]' },
    { id: 10, name: '웃긴', colorClassname: 'bg-[#FFFCF2] text-[#E7B110]' },
    { id: 11, name: '쾌활한', colorClassname: 'bg-[#FFFCF2] text-[#E7B110]' },
    { id: 12, name: '사교적', colorClassname: 'bg-[#FFFCF2] text-[#E7B110]' },
    { id: 13, name: '활발한', colorClassname: 'bg-[#FFFCF2] text-[#E7B110]' },
    { id: 14, name: '긍정적', colorClassname: 'bg-[#FFFCF2] text-[#E7B110]' },
    { id: 15, name: '조용한', colorClassname: 'bg-[#F7FFED] text-[#6DBD05]' },
    { id: 16, name: '지혜로운', colorClassname: 'bg-[#F7FFED] text-[#6DBD05]' },
    { id: 17, name: '신중한', colorClassname: 'bg-[#F7FFED] text-[#6DBD05]' },
    { id: 18, name: '꼼꼼한', colorClassname: 'bg-[#F7FFED] text-[#6DBD05]' },
    { id: 19, name: '성실한', colorClassname: 'bg-[#F7FFED] text-[#6DBD05]' },
    { id: 20, name: '영리한', colorClassname: 'bg-[#EAEBFF] text-[#757EF7]' },
    { id: 21, name: '분석적', colorClassname: 'bg-[#EAEBFF] text-[#757EF7]' },
    { id: 22, name: '냉철한', colorClassname: 'bg-[#EAEBFF] text-[#757EF7]' },
    { id: 23, name: '지적인', colorClassname: 'bg-[#EAEBFF] text-[#757EF7]' },
    { id: 24, name: '현실적', colorClassname: 'bg-[#EAEBFF] text-[#757EF7]' },
    { id: 25, name: '창의적', colorClassname: 'bg-[#F5E9FF] text-[#BF6DFF]' },
    { id: 26, name: '독립적', colorClassname: 'bg-[#F5E9FF] text-[#BF6DFF]' },
    { id: 27, name: '민감한', colorClassname: 'bg-[#F5E9FF] text-[#BF6DFF]' },
    { id: 28, name: '솔직한', colorClassname: 'bg-[#F5E9FF] text-[#BF6DFF]' },
    { id: 29, name: '독특한', colorClassname: 'bg-[#F5E9FF] text-[#BF6DFF]' },
] as const;

export const NO_ITEM_IDX = -1;

export const Items = [
    {
        id: 0,
        name: '노트북',
    },
    {
        id: 1,
        name: '아령',
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
] as const;
