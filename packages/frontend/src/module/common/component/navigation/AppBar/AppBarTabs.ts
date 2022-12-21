import { ResourceType } from "locale/i18n.types";
import { NftRoutes } from "module/nft/NftRouter";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { ExploreRoutes } from "module/explore/ExploreRouter";
import { DropRoutes } from "module/drop/DropRouter";

export interface AppBarTab {
    label: keyof ResourceType["translation"];
    path: string;
}

export const APPBAR_TABS: AppBarTab[] = [
    {
        label: "explore",
        path: ExploreRoutes.MAIN,
    },
    {
        label: "myNfts",
        path: NftRoutes.MY_NFTS,
    },
    {
        label: "myCollections",
        path: CollectionRoutes.MY_COLLECTIONS,
    },
    {
        label: "myDrops",
        path: DropRoutes.MY_DROPS,
    },
];
