import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate, useParams } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import useWallet from "module/wallet/hook/useWallet";

const ProfileNftsGrid = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const navigate = useNavigate();
    const { address } = useParams<string>();
    const { address: myAddress } = useWallet();

    const { data, hasNextPage, fetchNextPage, isFetching: isLoadingNfts } = useGetProfileNfts();
    const {
        data: { pages: [{ items: collections }] } = { pages: [{ items: [] }], pageParams: undefined },
        isLoading: isLoadingCollections,
    } = useGetUserCollections();

    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loadingNfts={isLoadingNfts}
            loadingCollections={isLoadingCollections}
            collections={collections}
            withFilters
            nothingToShow={
                <NothingToShow
                    css={{ justifyContent: "flex-start" }}
                    label={address === myAddress ? translateError("youHaveNoNfts") : translateError("userNoNfts")}
                >
                    {address === myAddress && <Button onClick={() => navigate(NftRoutes.NFT_CREATION)}>{translate("createNft")}</Button>}
                </NothingToShow>
            }
        />
    );
};

export default ProfileNftsGrid;
