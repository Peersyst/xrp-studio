import { ReactElement } from "react";
import { CollectionDto, NftDto } from "module/api/service";

export interface BaseNftPageProps {
    header: ReactElement;
    nft: NftDto;
    collectionNfts?: NftDto[];
    collections?: CollectionDto[];
    readonly?: boolean;
}

export type BaseNftPageContentProps = Omit<BaseNftPageProps, "header">;
