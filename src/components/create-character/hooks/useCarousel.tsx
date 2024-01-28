'use client';
import { useContext } from 'react';
import { CarouselDispatchContext } from '..';

export default function useCarousel() {
    const carouselDispatch = useContext(CarouselDispatchContext);
    if (carouselDispatch === null) throw new Error('Carousel Provider를 감싸서 사용하세요');

    return carouselDispatch;
}
