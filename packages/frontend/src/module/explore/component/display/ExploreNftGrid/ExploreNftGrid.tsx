import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import useGetNfts from "module/nft/query/useGetNfts";
import useNftsFilters, { NftsFilters } from "module/nft/hook/useNftsFilters";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import useTranslate from "module/common/hook/useTranslate";

const ExploreNftGrid = (): JSX.Element => {
    const translateError = useTranslate("error");
    const { query = "", ...restFilters }: NftsFilters = useNftsFilters();
    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetching: isLoadingNfts,
    } = useGetNfts({ account: undefined, query: "%" + query, isVerifiedArtist: true, ...restFilters });

    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loadingNfts={isLoadingNfts}
            withFilters
            withExtraSpace={false}
            nothingToShow={<NothingToShow css={{ justifyContent: "flex-start" }} label={translateError("noNftsAvailable")} />}
        />
    );
};

export default ExploreNftGrid;
