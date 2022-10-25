import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import { useCallback, useState } from "react";

const ProfileNftsGrid = (): JSX.Element => {
    const translate = useTranslate();
    //TODO: pass the filters to useGetProfileNfts
    //If need of persistency it can be update to recoil
    const [filters, setFilters] = useState({});
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetProfileNfts();
    const handleFilterChange = useCallback(
        (newFilters: any) => setFilters((oldFilters) => ({ ...oldFilters, ...newFilters })),
        [setFilters],
    );
    const navigate = useNavigate();
    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            filtersContext={{ value: filters, setValue: handleFilterChange }}
            loading={isFetching}
            nothingToShow={
                <NothingToShow css={{ height: "12rem" }} label={translate("youHaveNoNfts")}>
                    <Button onClick={() => navigate(NftRoutes.CREATE_NFT)}>{translate("createNft")}</Button>
                </NothingToShow>
            }
        />
    );
};

export default ProfileNftsGrid;
