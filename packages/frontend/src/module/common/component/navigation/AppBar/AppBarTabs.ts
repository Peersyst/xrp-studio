import { ResourceType } from "locale/i18n.types";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";
import { NftRoutes } from "module/nft/NftRouter";
import { CollectionRoutes } from "module/collection/CollectionRouter";

export interface AppBarTab {
    label: keyof ResourceType["translation"];
    path: string;
}

export const APPBAR_TABS: AppBarTab[] = [
    {
        label: "dashboard",
        path: DashboardRoutes.MAIN,
    },
    {
        label: "myNfts",
        path: NftRoutes.MY_NFTS,
    },
    {
        label: "myDrops",
        path: CollectionRoutes.MY_COLLECTIONS,
    },
];
