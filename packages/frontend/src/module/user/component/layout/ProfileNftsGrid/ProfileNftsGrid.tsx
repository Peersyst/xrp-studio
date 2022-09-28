import NftGrid from "module/nft/component/layout/NftGrid/NftGrid";
import { useGetProfileNfts } from "module/user/query/useGetProfileNfts";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { Button, Col, Typography } from "@peersyst/react-components";

const ProfileNftsGrid = (): JSX.Element => {
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
                            You have no Nfts
                        </Typography>
                        <Button>Create and NFT</Button>
                    </Col>
                </NothingToShow>
            }
        />
    );
};

export default ProfileNftsGrid;
