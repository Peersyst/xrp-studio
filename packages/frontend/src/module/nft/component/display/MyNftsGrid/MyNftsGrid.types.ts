import { UseGetNftMyNftsOptions } from "module/nft/query/useGetMyNfts";
import { ReactNode } from "react";
import { NftGridProps } from "module/nft/component/layout/NftGrid/NftGrid.types";

export interface MyNftsGridProps extends UseGetNftMyNftsOptions {
    loading?: boolean;
    nothingToShow?: ReactNode;
    link?: NftGridProps["link"];
}
