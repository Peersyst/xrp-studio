import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import useGetNfts, { UseGetNftsOptions } from "module/nft/query/useGetNfts";
import useNftsFilters from "module/nft/hook/useNftsFilters";

const ExploreNftTab = (): JSX.Element => {
    const filters: Omit<UseGetNftsOptions, "account"> = useNftsFilters();
    const { data, hasNextPage, fetchNextPage, isFetching: isLoadingNfts } = useGetNfts({ account: undefined, ...filters });

    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loadingNfts={isLoadingNfts}
            withFilters
        />
    );
};

export default ExploreNftTab;
