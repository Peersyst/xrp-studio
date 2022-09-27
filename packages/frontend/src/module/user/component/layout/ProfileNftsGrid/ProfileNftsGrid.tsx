import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";

const ProfileNftsGrid = (): JSX.Element => {
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetProfileNfts();

    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loading={isFetching}
            filters={<>Here profile filters</>}
        />
    );
};

export default ProfileNftsGrid;
