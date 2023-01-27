import { MyNftsGridProps } from "module/nft/component/display/MyNftsGrid/MyNftsGrid.types";
import useGetMyNfts from "module/nft/query/useGetMyNfts";
import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";

const MyNtfsGrid = ({ nothingToShow, loading, link, ...getMyNftsOptions }: MyNftsGridProps): JSX.Element => {
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyNfts(getMyNftsOptions, { enabled: !loading });

    return (
        <NftGrid
            link={link}
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loadingNfts={loading || isFetching}
            nothingToShow={nothingToShow}
        />
    );
};

export default MyNtfsGrid;
