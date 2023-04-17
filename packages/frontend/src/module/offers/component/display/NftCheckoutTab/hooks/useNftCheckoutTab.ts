import { NftDto } from "module/api/service";

export interface UseNftCheckoutTabParams {
    nft: NftDto;
}

export interface UseNftCheckoutTabReturn {
    hasBalance: boolean;
}

export default function useNftCheckoutTab() {}
