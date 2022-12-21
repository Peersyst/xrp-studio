import useNftsFilters from "module/nft/hook/useNftsFilters";
import useTranslate from "module/common/hook/useTranslate";
import { ReactNode } from "react";

export interface UseNftNothingToShowReturn {
    nftNothingToShow: string | ReactNode;
}

export interface UseNftNothingToShowParams {
    nothingToShow: string | ReactNode;
}

export default function ({ nothingToShow }: UseNftNothingToShowParams): UseNftNothingToShowReturn {
    const gridFilters = useNftsFilters();
    const translateError = useTranslate("error");

    const hasFilters = !!gridFilters.collections || !!gridFilters.query;

    return { nftNothingToShow: hasFilters ? translateError("noMatchingNftsWithFilters") : nothingToShow };
}
