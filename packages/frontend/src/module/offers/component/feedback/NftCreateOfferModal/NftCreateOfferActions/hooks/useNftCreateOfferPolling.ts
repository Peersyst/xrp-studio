import { polling } from "@peersyst/react-utils";
import { NftDto, NftService } from "module/api/service";
import usePollXummTx from "module/blockchain/hook/usePollXummTx";
import useGetXummTxPayload from "module/blockchain/query/useGetXummTxPayload";
import Queries from "query/queries";
import { useQueryClient } from "react-query";

export interface HandleOfferStatusParams {
    offerHash: string;
    nft: NftDto;
}

export interface HandleFetchParams {
    offerHash: string;
    nftId: NftDto["id"];
}

function isOfferInNft(offerHash: string, nft: NftDto) {
    return nft.offers?.find((offer) => offer.offerHash === offerHash) !== undefined;
}

export default function useNftCreateOfferPolling() {
    const { startPolling } = usePollXummTx();
    const { mutateAsync } = useGetXummTxPayload();
    const queryClient = useQueryClient();

    const handleOfferIndexedStatus = ({ nft, offerHash }: HandleOfferStatusParams) => !isOfferInNft(offerHash, nft);

    async function handleFetchNft({ nftId, offerHash }: HandleFetchParams): Promise<HandleOfferStatusParams> {
        const nft = await NftService.nftControllerGetNft(nftId);
        return { nft, offerHash };
    }

    const pollOfferIndexed = async (params: HandleFetchParams) => {
        await polling(() => handleFetchNft(params), handleOfferIndexedStatus);
    };

    async function startPollingNftCreateOffer(uuid: string, nftId: NftDto["id"]) {
        await startPolling(uuid);
        const payload = await mutateAsync(uuid);
        await pollOfferIndexed({ offerHash: payload.txid, nftId });
        await queryClient.invalidateQueries([Queries.NFT, nftId]);
    }

    return {
        startPollingNftCreateOffer,
    };
}
