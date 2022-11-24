import { useSearchParams } from "react-router-dom";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useTranslate from "module/common/hook/useTranslate";
import { Popover, Row, Typography } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { CollectionCreationPageHeaderProps } from "./CollectionCreationPageHeader.types";
import useGoBack from "module/common/hook/useGoBack";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";

const CollectionCreationPageHeader = ({ loading, saving, publishing }: CollectionCreationPageHeaderProps): JSX.Element => {
    const translate = useTranslate();
    const goBack = useGoBack();
    const [searchParams] = useSearchParams();

    const [{ nfts }] = useCollectionCreationState();
    const hasNfts = !!nfts.length;

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
                    {!isEdition && (
                        <Popover visible={hasNfts ? false : undefined} arrow position="top">
                            <Popover.Content>
                                <span>
                                    <Button
                                        size="lg"
                                        type="submit"
                                        action="publish"
                                        loading={publishing}
                                        disabled={!hasNfts || loading || saving}
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
                    )}
                </Row>
            }
        />
    );
};

export default CollectionCreationPageHeader;
