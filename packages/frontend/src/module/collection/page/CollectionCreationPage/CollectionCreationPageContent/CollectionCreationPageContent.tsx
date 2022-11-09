import { CollectionCreationPageContentProps } from "module/collection/page/CollectionCreationPage/CollectionCreationPageContent/CollectionCreationPageContent.types";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import { Col, Divider, Row, Skeleton, Switch } from "@peersyst/react-components";
import {
    CollectionCoverInput,
    CollectionCreationPageContentCard,
    CollectionImgInput,
} from "module/collection/page/CollectionCreationPage/CollectionCreationPageContent/CollectionCreationPageContent.styles";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import TextArea from "module/common/component/input/TextArea/TextArea";
import { capitalize } from "@peersyst/react-utils";
import useWallet from "module/wallet/component/hooks/useWallet";
import ColorInput from "module/common/component/input/ColorInput/ColorInput";
import PropertiesInput from "module/nft/component/input/PropertiesInput/PropertiesInput";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import { CollectionCreationState } from "module/collection/state/CollectionCreationState";
import { CollectionCreationFormFields } from "module/collection/types";

const CollectionCreationPageContent = ({ collection, loading }: CollectionCreationPageContentProps): JSX.Element => {
    const translate = useTranslate();

    const { address: connectedWalletAddress } = useWallet();

    const { header: collectionHeader, image: collectionImage, name: collectionName, description: collectionDescription } = collection || {};

    const [
        {
            header,
            image,
            name,
            description,
            issuer,
            transferFee,
            externalUrl,
            backgroundColor,
            burnable,
            onlyXRP,
            trustLine,
            transferable,
            attributes,
        },
        setCollectionCreationState,
    ] = useCollectionCreationState();

    function normalizedHandleChange<K extends keyof CollectionCreationState>(attribute: keyof CollectionCreationState) {
        return (value: CollectionCreationState[K]) => setCollectionCreationState({ [attribute]: value });
    }

    return (
        <PageContent>
            <Row gap="1.5rem">
                <Col flex={4} />
                <Col flex={3}>
                    <Skeleton loading={loading} width="100%">
                        <CollectionCreationPageContentCard>
                            <Col gap="1.5rem">
                                <Col>
                                    <CollectionCoverInput
                                        key={"header: " + collectionHeader}
                                        name={CollectionCreationFormFields.HEADER}
                                        defaultValue={collectionHeader}
                                        alt="collection-cover-img"
                                        value={header}
                                        onChange={normalizedHandleChange("header")}
                                    />
                                    <div css={{ margin: "-3rem auto 0" }}>
                                        <CollectionImgInput
                                            key={"image: " + collectionImage}
                                            name={CollectionCreationFormFields.IMAGE}
                                            defaultValue={collectionImage}
                                            alt="collection-img"
                                            value={image}
                                            onChange={normalizedHandleChange("image")}
                                        />
                                    </div>
                                </Col>
                                <TextField
                                    key={"name: " + collectionName}
                                    name={CollectionCreationFormFields.NAME}
                                    defaultValue={collectionName}
                                    label={capitalize(translate("name"))}
                                    placeholder={translate("collectionNamePlaceholder")}
                                    variant="filled"
                                    value={name}
                                    onChange={normalizedHandleChange("name")}
                                />
                                <TextArea
                                    key={"description: " + collectionDescription}
                                    name={CollectionCreationFormFields.DESCRIPTION}
                                    defaultValue={collectionDescription}
                                    label={translate("description")}
                                    placeholder={translate("collectionDescriptionPlaceholder")}
                                    variant="filled"
                                    value={description}
                                    onChange={normalizedHandleChange("description")}
                                />
                                {!collection && (
                                    <>
                                        <TextField
                                            name={CollectionCreationFormFields.ISSUER}
                                            label={translate("issuer")}
                                            placeholder={connectedWalletAddress}
                                            variant="filled"
                                            validators={{ address: true }}
                                            value={issuer}
                                            onChange={normalizedHandleChange("issuer")}
                                        />
                                        <TextField
                                            name={CollectionCreationFormFields.TRANSFER_FEE}
                                            label={translate("transferFee")}
                                            placeholder="0"
                                            variant="filled"
                                            type="number"
                                            validators={{ lte: 50, gte: 0 }}
                                            suffix="%"
                                            hint={translate("roundsToNDecimals", { decimals: 3 })}
                                            value={transferFee?.toString()}
                                            onChange={normalizedHandleChange("transferFee")}
                                        />
                                        <TextField
                                            name={CollectionCreationFormFields.EXTERNAL_URL}
                                            label={translate("externalLink")}
                                            placeholder={translate("externalLinkPlaceholder")}
                                            variant="filled"
                                            validators={{ url: true }}
                                            value={externalUrl}
                                            onChange={normalizedHandleChange("externalUrl")}
                                        />
                                        <ColorInput
                                            name={CollectionCreationFormFields.BACKGROUND_COLOR}
                                            label={translate("backgroundColor")}
                                            TextFieldProps={{
                                                variant: "filled",
                                                placeholder: translate("collectionBackgroundColorPlaceholder"),
                                            }}
                                            value={backgroundColor}
                                            onChange={normalizedHandleChange("backgroundColor")}
                                        />
                                        <Divider />
                                        <Switch
                                            name={CollectionCreationFormFields.BURNABLE}
                                            label={translate("burnable")}
                                            value={burnable}
                                            onChange={normalizedHandleChange("burnable")}
                                        />
                                        <Switch
                                            name={CollectionCreationFormFields.ONLY_XRP}
                                            label={translate("onlyXRP")}
                                            value={onlyXRP}
                                            onChange={normalizedHandleChange("onlyXRP")}
                                        />
                                        <Switch
                                            name={CollectionCreationFormFields.TRUST_LINE}
                                            label={translate("trustLine")}
                                            value={trustLine}
                                            onChange={normalizedHandleChange("trustLine")}
                                        />
                                        <Switch
                                            name={CollectionCreationFormFields.TRANSFERABLE}
                                            label={translate("transferable")}
                                            value={transferable}
                                            onChange={normalizedHandleChange("transferable")}
                                        />
                                        <Divider />
                                        <PropertiesInput
                                            name={CollectionCreationFormFields.ATTRIBUTES}
                                            label={translate("attributes")}
                                            variant="filled"
                                            value={attributes}
                                            onChange={normalizedHandleChange("attributes")}
                                        />
                                    </>
                                )}
                            </Col>
                        </CollectionCreationPageContentCard>
                    </Skeleton>
                </Col>
            </Row>
        </PageContent>
    );
};

export default CollectionCreationPageContent;
