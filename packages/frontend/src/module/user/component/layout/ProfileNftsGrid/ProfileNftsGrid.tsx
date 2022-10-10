import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { Link } from "react-router-dom";
import { NftRoutes } from "module/nft/NftRouter";

const ProfileNftsGrid = (): JSX.Element => {
    const translate = useTranslate();
    const { data, hasNextPage, fetchNextPage, isFetching } = useGetProfileNfts();
    return (
        <NftGrid
            data={data}
            callback={() => fetchNextPage({ cancelRefetch: false })}
            end={!hasNextPage}
            loading={isFetching}
            filters={<>Here profile filters</>}
            nothingToShow={
                <NothingToShow css={{ height: "12rem" }} label={translate("youHaveNoNfts")}>
                    <Link to={NftRoutes.CREATE_NFT}>
                        <Button>{translate("createNft")}</Button>
                    </Link>
                </NothingToShow>
            }
        />
    );
};

export default ProfileNftsGrid;
