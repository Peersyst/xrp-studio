import { ButtonSize, CarouselProps as BaseCarouselProps } from "@peersyst/react-components";
import { ComponentType } from "react";

export interface CarouselProps extends BaseCarouselProps {
    loading?: boolean;
    arrowSize?: ButtonSize;
    Skeleton?: ComponentType<any>;
    skeletonCount?: number;
}

export type InheritedCarouselProps = Pick<
    CarouselProps,
    "loading" | "arrowSize" | "gap" | "autoplay" | "autoplayInterval" | "renderArrows" | "className" | "style" | "skeletonCount"
>;

export interface CarouselRootProps {
    gap: number;
}
