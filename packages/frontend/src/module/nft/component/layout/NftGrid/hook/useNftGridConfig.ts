import useNftsFilters from "module/nft/hook/useNftsFilters";
import useTranslate from "module/common/hook/useTranslate";
import { ReactNode } from "react";
import { useGetNftGridBreakpoints } from "module/nft/component/layout/NftGrid/hook/useGetNftGridBreakpoints";
import { GridBreakpoint, useTheme } from "@peersyst/react-components";

export interface UseNftGridConfigReturn {
    nftNothingToShow: string | ReactNode;
    breakpoints: GridBreakpoint[] | undefined;
    tabletBreakpoint: number;
}

interface UseNftGridConfigParams {
    nothingToShow: string | ReactNode;
}

export default function ({ nothingToShow }: UseNftGridConfigParams): UseNftGridConfigReturn {
    const translateError = useTranslate("error");
    const breakpoints = useGetNftGridBreakpoints();
    const {
        breakpoints: {
            values: { filters },
        },
    } = useTheme();

    const gridFilters = useNftsFilters();
    const hasFilters = !!gridFilters.collections || !!gridFilters.query;

    return {
        nftNothingToShow: hasFilters ? translateError("noMatchingNftsWithFilters") : nothingToShow,
        breakpoints,
        tabletBreakpoint: filters,
    };
}
