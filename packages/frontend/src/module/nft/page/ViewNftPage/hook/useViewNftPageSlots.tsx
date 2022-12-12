import { NftDto } from "module/api/service";
import { ReactNode } from "react";
import useTranslate from "module/common/hook/useTranslate";
import parseFlags from "module/nft/util/parseFlags";
import { BlockchainAddress, Col, Divider, Image, Label, Row, Switch, Typography } from "@peersyst/react-components";
import BaseNftPageContent from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent";
import { capitalize } from "@peersyst/react-utils";
import ColorInput from "module/common/component/input/ColorInput/ColorInput";
import Color from "color";
import PropertiesInput from "module/nft/component/input/PropertiesInput/PropertiesInput";
import { BaseNftPageContentLeftSlot } from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContentSlots";
import Link from "module/common/component/navigation/Link/Link";
import UserProfileLink from "module/user/component/navigation/UserProfileLink/UserProfileLink";
import { config } from "config";
import { CollectionRoutes } from "module/collection/CollectionRouter";

export interface UserViewNftPageSlots {
    nft: NftDto | undefined;
    loading?: boolean;
}

/**
 * Returns ViewNftPage slots
 * Cannot be a normal component as it would break the slots, because it would generate a wrapper object.
 * @param nft
 * @param loading
 */
export default function ({ nft, loading = false }: UserViewNftPageSlots): ReactNode {
    const translate = useTranslate();

    const {
        tokenId,
        mintTransactionHash,
        transferFee,
        metadata: { image = "", name = "", description = "", externalUrl = "", attributes = [], backgroundColor = "" } = {},
        collection: nftCollection,
        flags = 0,
        user = { address: "" },
    } = nft || {};
    const { burnable, onlyXRP, transferable } = parseFlags(flags);

    return (
        <>
            <BaseNftPageContent.Left>
                <BaseNftPageContentLeftSlot.Image loading={loading} key={nft?.id}>
                    <Image src={image} alt="nft-image" fallback={config.nftDefaultImageUrl} />
                </BaseNftPageContentLeftSlot.Image>
                <BaseNftPageContentLeftSlot.Info loading={loading}>
                    <Label label={capitalize(translate("name"))}>
                        {name ? (
                            <Typography variant="body1" singleLine>
                                {name}
                            </Typography>
                        ) : (
                            <Typography variant="body1" fontStyle="italic">
                                {translate("none", { context: "male" })}
                            </Typography>
                        )}
                    </Label>
                    <Label label={translate("description")}>
                        {description ? (
                            <Typography variant="body1">{description}</Typography>
                        ) : (
                            <Typography variant="body1" fontStyle="italic">
                                {translate("none", { context: "female" })}
                            </Typography>
                        )}
                    </Label>
                </BaseNftPageContentLeftSlot.Info>
            </BaseNftPageContent.Left>
            <BaseNftPageContent.Right loading={loading}>
                <Label label={translate("creator")}>
                    <UserProfileLink user={user} />
                </Label>
                <Label label={translate("tokenId")}>
                    <BlockchainAddress variant="body1" address={tokenId || ""} type="nft" fontWeight={600} />
                </Label>
                <Label label={translate("mintTransactionHash")}>
                    <BlockchainAddress variant="body1" address={mintTransactionHash || ""} type="tx" fontWeight={600} />
                </Label>
                <Label label={translate("collection")}>
                    {nftCollection ? (
                        <Link to={CollectionRoutes.VIEW_COLLECTION.replace(":id", nftCollection.id.toString())} variant="body1">
                            {nftCollection.name}
                        </Link>
                    ) : (
                        <Typography variant="body1" fontStyle="italic">
                            {translate("none", { context: "female" })}
                        </Typography>
                    )}
                </Label>
                <Label label={translate("transferFee")}>
                    <Typography variant="body1" fontStyle={transferFee === undefined ? "italic" : undefined}>
                        {transferFee === undefined
                            ? translate("none", { context: "female" })
                            : `${translate("formatNumber", { val: transferFee, minimumFractionDigits: 3, maximumFractionDigits: 3 })}%`}
                    </Typography>
                </Label>
                {externalUrl && (
                    <Label label={translate("externalLink")}>
                        <Link to={externalUrl} target="_blank" variant="body1">
                            {externalUrl}
                        </Link>
                    </Label>
                )}
                {backgroundColor && (
                    <Label label={translate("backgroundColor")}>
                        {backgroundColor && (
                            <Row gap="1rem" alignItems="center">
                                <ColorInput value={new Color(backgroundColor)} showTextField={false} readonly />
                                <Typography variant="body1">{backgroundColor}</Typography>
                            </Row>
                        )}
                    </Label>
                )}
                <Divider />
                <Switch label={translate("burnable")} value={burnable} readonly />
                <Switch label={translate("onlyXRP")} value={onlyXRP} readonly />
                <Switch label={translate("transferable")} value={transferable} readonly />
                <Divider />
                <Col>
                    <PropertiesInput label={translate("attributes")} value={attributes} readonly variant="filled" />
                    {(!attributes || attributes.length === 0) && (
                        <Typography variant="body1" fontStyle="italic">
                            {translate("none", { context: "male" })}
                        </Typography>
                    )}
                </Col>
            </BaseNftPageContent.Right>
        </>
    );
}
