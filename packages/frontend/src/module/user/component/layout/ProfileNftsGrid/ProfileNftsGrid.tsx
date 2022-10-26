import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import { FiltersProvider } from "module/common/component/input/Filters/FiltersContext";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import { UseGetNftsOptions } from "module/nft/query/useGetNfts";
import useNftsFiltersReducer from "module/nft/hook/useNftsFiltersReducer";

const ProfileNftsGrid = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();
    //If there is a need of persistency it can be used recoil instead of useReducer
    const [filters, setFilters] = useNftsFiltersReducer();
    const { data, hasNextPage, fetchNextPage, isFetching: isLoadingNfts } = useGetProfileNfts(filters);
    const {
        data: { pages: [{ items: collections }] } = { pages: [{ items: [] }], pageParams: undefined },
        isLoading: isLoadingCollections,
    } = useGetUserCollections();

    /**
     * Not memoized with a useCallBack because with the useReducer it is not necessary
     * Moreover as useGetProfileNfts memoizes the query it is not necessary to memoize the function
     */
    const handleFilterChange = (newFilters: Partial<UseGetNftsOptions>) => setFilters(newFilters);

    return (
        <FiltersProvider value={{ filters, setFilters: handleFilterChange }}>
            <NftGrid
                data={data}
                callback={() => fetchNextPage({ cancelRefetch: false })}
                end={!hasNextPage}
                loadingNfts={isLoadingNfts}
                loadingCollections={isLoadingCollections}
                collections={collections}
                nothingToShow={
                    <NothingToShow css={{ height: "12rem" }} label={translate("youHaveNoNfts")}>
                        <Button onClick={() => navigate(NftRoutes.CREATE_NFT)}>{translate("createNft")}</Button>
                    </NothingToShow>
                }
            />
        </FiltersProvider>
    );
};

export default ProfileNftsGrid;
