import { ComponentType, ReactElement, ReactNode } from "react";
import { GridProps, InfiniteScrollProps } from "@peersyst/react-components";
import { PaginatedData } from "query-utils";
import { InfiniteData } from "react-query";
import { SkeletonComponentProps } from "module/common/component/feedback/Skeletons/Skeletons.types";

export type BaseGridPropsExtensions = InfiniteScrollProps & GridProps;

export interface BaseGridProps<T extends PaginatedData> extends BaseGridPropsExtensions {
    children: (items: T["items"]) => ReactNode;
    data: InfiniteData<T> | undefined;
    nothingToShow?: ReactNode;
    Skeletons: ComponentType<SkeletonComponentProps>;
}

export interface ExposedBaseGridProps<T extends PaginatedData> extends InfiniteScrollProps {
    children: (items: T["items"]) => ReactNode;
    data: InfiniteData<T> | undefined;
    nothingToShow?: ReactNode;
    Skeletons?: ComponentType<SkeletonComponentProps>;
}
