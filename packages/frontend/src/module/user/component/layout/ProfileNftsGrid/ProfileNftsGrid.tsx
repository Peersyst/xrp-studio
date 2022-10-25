import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import { useState } from "react";
import { FiltersBaseContextValue } from "module/common/component/input/Filters/FiltersContext";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import { UseGetNftsOptions } from "module/nft/query/useGetNfts";

const ProfileNftsGrid = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();
    //If there is a need of persistency it can be used recoil instead of useState
    const [filters, setFilters] = useState<UseGetNftsOptions>({});
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetProfileNfts(filters);
    const { data: { pages: [{ items: collections }] } = { pages: [{ items: [] }], pageParams: undefined } } = useGetUserCollections();

    /**
     * Not memoized with a useCallBack because the memoization is done by the useGetProfileNfts
     */
    const handleFilterChange = (newFilters: FiltersBaseContextValue) => setFilters((oldFilters) => ({ ...oldFilters, ...newFilters }));

    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            filtersContext={{ value: filters, setValue: handleFilterChange }}
            loading={isFetching}
            collections={collections}
            nothingToShow={
                <NothingToShow css={{ height: "12rem" }} label={translate("youHaveNoNfts")}>
                    <Button onClick={() => navigate(NftRoutes.CREATE_NFT)}>{translate("createNft")}</Button>
                </NothingToShow>
            }
        />
    );
};

export default ProfileNftsGrid;
