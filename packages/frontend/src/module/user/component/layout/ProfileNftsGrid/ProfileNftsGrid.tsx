import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { useNavigate } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";
import Filters from "module/common/component/input/Filters/Filters";

const ProfileNftsGrid = (): JSX.Element => {
    const translate = useTranslate();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetProfileNfts();
    const navigate = useNavigate();
    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loading={isFetching}
            filters={<Filters />}
            nothingToShow={
                <NothingToShow css={{ height: "12rem" }} label={translate("youHaveNoNfts")}>
                    <Button onClick={() => navigate(NftRoutes.CREATE_NFT)}>{translate("createNft")}</Button>
                </NothingToShow>
            }
        />
    );
};

export default ProfileNftsGrid;
