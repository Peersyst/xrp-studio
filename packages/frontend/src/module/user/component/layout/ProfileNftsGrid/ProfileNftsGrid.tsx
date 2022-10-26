import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import useNftsFiltersReducer from "module/nft/hook/useNftsFiltersReducer";

const ProfileNftsGrid = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const [filters, setFilters] = useNftsFiltersReducer();
    const { data, hasNextPage, fetchNextPage, isFetching: isLoadingNfts } = useGetProfileNfts(filters);
    const {
        data: { pages: [{ items: collections }] } = { pages: [{ items: [] }], pageParams: undefined },
        isLoading: isLoadingCollections,
    } = useGetUserCollections();

    return (
        <NftGrid
            filtersContext={{ filters, setFilters }}
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loadingNfts={isLoadingNfts}
            loadingCollections={isLoadingCollections}
            collections={collections}
            nothingToShow={
                <NothingToShow css={{ height: "20rem" }} label={translate("youHaveNoNfts")}>
                    <Button onClick={() => navigate(NftRoutes.CREATE_NFT)}>{translate("createNft")}</Button>
                </NothingToShow>
            }
        />
    );
};

export default ProfileNftsGrid;
