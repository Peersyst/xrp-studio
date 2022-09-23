import BaseNftGridWithFilters from "module/nft/component/layout/BaseNftGridWithFilters/BaseNftGridWithFilters";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";

const ProfileNftsGrid = (): JSX.Element => {
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetProfileNfts();
    return (
        <BaseNftGridWithFilters
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loading={isFetching}
        />
    );
};

export default ProfileNftsGrid;
