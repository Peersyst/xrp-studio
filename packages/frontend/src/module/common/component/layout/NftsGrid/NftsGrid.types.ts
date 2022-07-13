import { ComponentType, ReactElement, ReactNode } from "react";
import { GridProps, InfiniteScrollProps } from "@peersyst/react-components";
import { PaginatedData } from "query-utils";
import { NftDto } from "module/api/service/models/NftDto";
import { SkeletonComponentProps } from "module/nft/component/Skeletons/Skeletons.types";

export type NftGridPropsExtensions = InfiniteScrollProps & GridProps;

export interface NftGridProps<T extends PaginatedData> extends NftGridPropsExtensions {
    filterBreakpoints: GridProps["breakpoints"];
    children: (items: T["items"]) => ReactNode;
    data: NftDto[];
    nothingToShowMessage?: string;
    filters?: ReactElement;
    Skeletons: ComponentType<SkeletonComponentProps>;
}
