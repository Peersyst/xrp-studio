import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { Button, Col, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

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
                <NothingToShow>
                    <Col flex={1} alignItems="center" justifyContent="center" gap="2rem" css={{ height: "12rem" }}>
                        <Typography variant="h6" fontWeight="bold" light>
                            {translate("youHaveNoNfts")}
                        </Typography>
                        <Button>{translate("createNft")}</Button>
                    </Col>
                </NothingToShow>
            }
        />
    );
};

export default ProfileNftsGrid;
