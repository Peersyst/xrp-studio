import { ResourceType } from "locale/i18n.types";
import { NftRoutes } from "module/nft/NftRouter";
import { CollectionRoutes } from "module/collection/CollectionRouter";

export interface AppBarTab {
    label: keyof ResourceType["translation"];
    path: string;
}

export const APPBAR_TABS: AppBarTab[] = [
    {
        label: "myDrafts",
        path: NftRoutes.MY_NFTS,
    },
    {
        label: "myCollections",
        path: CollectionRoutes.MY_COLLECTIONS,
    },
];
