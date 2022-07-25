import { ComponentType, ReactNode } from "react";
import { GridProps, InfiniteScrollProps } from "@peersyst/react-components";
import { PaginatedData } from "query-utils";
import { InfiniteData } from "react-query";
import { SkeletonComponentProps } from "module/common/component/nft/Skeletons/Skeletons.types";

export type BaseGridPropsExtensions = InfiniteScrollProps & GridProps;

export interface BaseGridProps<T extends PaginatedData> extends BaseGridPropsExtensions {
    children: (items: T["items"]) => ReactNode;
    data: InfiniteData<T> | undefined;
    nothingToShowMessage?: string;
    Skeletons: ComponentType<SkeletonComponentProps>;
}
