import { MetadataDto } from "module/api/service";
import extractPhygitalAttribute from "module/nft/util/extractPhygitalAttribute";
import { useMemo } from "react";

export type UseNftCreationDefaultValues<Nft extends { metadata?: MetadataDto }> = Nft & {
    phygitalPublicKey?: string | undefined;
};

export default function <Nft extends { metadata?: MetadataDto }>(nft: Nft | undefined): UseNftCreationDefaultValues<Nft> {
    return useMemo(() => {
        if (!nft) return {} as Nft;

        const [attributes, phygitalPublicKey] = extractPhygitalAttribute(nft.metadata?.attributes || []);

        const metadata = { ...nft.metadata, attributes } as MetadataDto;

        return {
            ...nft,
            metadata,
            phygitalPublicKey,
        };
    }, [nft]);
}
