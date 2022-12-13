import { useSearchParams } from "react-router-dom";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useTranslate from "module/common/hook/useTranslate";
import { Popover, Row, Typography } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { CollectionCreationPageHeaderProps } from "./CollectionCreationPageHeader.types";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import useWallet from "module/wallet/hook/useWallet";
import useGetUser from "module/user/query/useGetUser";
import useGoBack from "module/common/hook/useGoBack";

const CollectionCreationPageHeader = ({ collection, loading, saving, publishing }: CollectionCreationPageHeaderProps): JSX.Element => {
    const translate = useTranslate();
    const goBack = useGoBack();
    const [searchParams] = useSearchParams();

    const { address } = useWallet();
    const { data: user } = useGetUser(address);

    const [{ nfts }] = useCollectionCreationState();
    const hasUnpublishedNfts =
        nfts.length > 0 || (collection?.nfts || []).some((nft) => nft.status !== "confirmed" && nft.status !== "pending");

    const allNftsAreDrafts = !(collection?.nfts || []).some((nft) => nft.status !== "draft");

    const isEdition = !!searchParams.get("id");

    const disableCancel = loading || saving || publishing;

    return (
        <MainPageHeader
            title={isEdition ? translate("editCollection") : translate("createCollection")}
            complement={
                <Row gap="1rem" wrap wrapGap="1.5rem">
                    <Button size="lg" variant="secondary" disabled={disableCancel} onClick={goBack}>
                        {translate("cancel")}
                    </Button>
                    <Button size="lg" type="submit" action="save" loading={saving} disabled={loading || publishing}>
                        {translate("save")}
                    </Button>
                    <Popover visible={hasUnpublishedNfts ? false : undefined} arrow position="top">
                        <Popover.Content>
                            <span>
                                <Button
                                    size="lg"
                                    type="submit"
                                    action="publish"
                                    loading={publishing}
                                    disabled={loading || saving || !hasUnpublishedNfts}
                                >
                                    {translate("publish")}
                                </Button>
                            </span>
                        </Popover.Content>
                        <Popover.Popper>
                            <Typography variant="body2" css={{ padding: "0.75rem" }}>
                                {translate("cantPublishCollectionWithoutNfts")}
                            </Typography>
                        </Popover.Popper>
                    </Popover>
                    {user && user.verifiedArtist && [...nfts, ...(collection?.nfts || [])].length > 0 && (
                        <Popover visible={allNftsAreDrafts ? false : undefined} arrow position="top">
                            <Popover.Content>
                                <span>
                                    <Button size="lg" type="submit" action="launch" disabled={loading || saving || !allNftsAreDrafts}>
                                        {translate("launch")}
                                    </Button>
                                </span>
                            </Popover.Content>
                            <Popover.Popper>
                                <Typography variant="body2" css={{ padding: "0.75rem" }}>
                                    {translate("cantLaunchCollectionWithPublishedNfts")}
                                </Typography>
                            </Popover.Popper>
                        </Popover>
                    )}
                </Row>
            }
        />
    );
};

export default CollectionCreationPageHeader;
